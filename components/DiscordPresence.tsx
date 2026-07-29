"use client"

import Image from "next/image"
import Link from "next/link"
import {
    createContext,
    type ReactNode,
    useCallback,
    useContext,
    useEffect,
    useState,
} from "react"

const DISCORD_USER_ID = "596925572710400011"
const LANYARD_URL = `https://api.lanyard.rest/v1/users/${DISCORD_USER_ID}`
const DISCORD_CHAT_URL = `https://discord.com/users/${DISCORD_USER_ID}`

type DiscordStatus = "online" | "idle" | "dnd" | "offline"

type DiscordActivity = {
    id: string
    name: string
    type: number
    details?: string
    state?: string
    timestamps?: {
        start?: number
        end?: number
    }
}

type LanyardPresence = {
    discord_status: DiscordStatus
    discord_user: {
        avatar: string | null
        display_name: string | null
        global_name: string | null
        id: string
        username: string
    }
    activities: DiscordActivity[]
    active_on_discord_desktop: boolean
    active_on_discord_mobile: boolean
    active_on_discord_web: boolean
}

type LanyardResponse = {
    success: boolean
    data?: LanyardPresence
}

type DiscordPresenceContextValue = {
    presence: LanyardPresence | null
    presenceError: boolean
    activityProgress: number | null
}

const DiscordPresenceContext = createContext<DiscordPresenceContextValue | null>(null)

const statusMeta: Record<DiscordStatus, {
    label: string
    badgeLabel: string
    dot: string
    ping: string
}> = {
    online: {
        label: "Online",
        badgeLabel: "Online on Discord",
        dot: "bg-green-500",
        ping: "bg-green-400",
    },
    idle: {
        label: "Idle",
        badgeLabel: "Idle on Discord",
        dot: "bg-amber-400",
        ping: "bg-amber-300",
    },
    dnd: {
        label: "Do not disturb",
        badgeLabel: "Do not disturb",
        dot: "bg-red-500",
        ping: "bg-red-400",
    },
    offline: {
        label: "Offline",
        badgeLabel: "Offline on Discord",
        dot: "bg-slate-400",
        ping: "bg-slate-300",
    },
}

const activityVerbs: Record<number, string> = {
    0: "Playing",
    1: "Streaming",
    2: "Listening to",
    3: "Watching",
    4: "Custom status",
    5: "Competing in",
}

function getActivity(presence: LanyardPresence) {
    return presence.activities.find((activity) => activity.type !== 4)
        ?? presence.activities.find((activity) => activity.type === 4)
}

function getActivityProgress(activity?: DiscordActivity) {
    const start = activity?.timestamps?.start
    const end = activity?.timestamps?.end

    if (!start || !end || end <= start) {
        return null
    }

    return Math.min(100, Math.max(0, ((Date.now() - start) / (end - start)) * 100))
}

function getActiveDevices(presence: LanyardPresence) {
    const devices = [
        presence.active_on_discord_desktop && "Desktop",
        presence.active_on_discord_mobile && "Mobile",
        presence.active_on_discord_web && "Web",
    ].filter(Boolean)

    return devices.length > 0 ? devices.join(" + ") : "No active device"
}

function getAvatarUrl(presence: LanyardPresence | null) {
    const user = presence?.discord_user

    if (!user?.avatar) {
        return "https://cdn.discordapp.com/embed/avatars/0.png"
    }

    const extension = user.avatar.startsWith("a_") ? "gif" : "png"
    return `https://cdn.discordapp.com/avatars/${user.id}/${user.avatar}.${extension}?size=256`
}

function useDiscordPresence() {
    const context = useContext(DiscordPresenceContext)

    if (!context) {
        throw new Error("Discord presence components must be used inside DiscordPresenceProvider")
    }

    return context
}

export function DiscordPresenceProvider({ children }: { children: ReactNode }) {
    const [presence, setPresence] = useState<LanyardPresence | null>(null)
    const [presenceError, setPresenceError] = useState(false)
    const [activityProgress, setActivityProgress] = useState<number | null>(null)

    const fetchPresence = useCallback(async () => {
        try {
            const response = await fetch(LANYARD_URL, { cache: "no-store" })

            if (!response.ok) {
                throw new Error(`Lanyard returned ${response.status}`)
            }

            const payload = await response.json() as LanyardResponse

            if (!payload.success || !payload.data) {
                throw new Error("Lanyard returned an invalid presence")
            }

            setPresence(payload.data)
            setActivityProgress(getActivityProgress(getActivity(payload.data)))
            setPresenceError(false)
        } catch {
            setPresenceError(true)
        }
    }, [])

    useEffect(() => {
        const initialRefresh = window.setTimeout(() => {
            void fetchPresence()
        }, 0)

        const interval = window.setInterval(() => {
            void fetchPresence()
        }, 30_000)

        const refreshWhenVisible = () => {
            if (document.visibilityState === "visible") {
                void fetchPresence()
            }
        }

        document.addEventListener("visibilitychange", refreshWhenVisible)

        return () => {
            window.clearTimeout(initialRefresh)
            window.clearInterval(interval)
            document.removeEventListener("visibilitychange", refreshWhenVisible)
        }
    }, [fetchPresence])

    return (
        <DiscordPresenceContext value={{ presence, presenceError, activityProgress }}>
            {children}
        </DiscordPresenceContext>
    )
}

export function DiscordStatusBadge() {
    const { presence, presenceError } = useDiscordPresence()
    const status = presence?.discord_status ?? "offline"
    const meta = statusMeta[status]
    const label = !presence
        ? presenceError ? "Discord unavailable" : "Checking Discord"
        : presenceError ? `${meta.badgeLabel} · Last known` : meta.badgeLabel

    return (
        <Link
            href="/contact#discord-information"
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-50 border border-sky-100 text-sky-700 text-xs font-semibold uppercase tracking-wide mb-4 transition hover:border-sky-300 hover:bg-sky-100 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-600"
            aria-live="polite">
            <PresenceDot status={status} animate={Boolean(presence)} />
            <span>{label}</span>
        </Link>
    )
}

export function DiscordInformation() {
    const { presence, presenceError, activityProgress } = useDiscordPresence()
    const status = presence?.discord_status ?? "offline"
    const meta = statusMeta[status]
    const activity = presence ? getActivity(presence) : undefined
    const displayName = presence?.discord_user.display_name
        ?? presence?.discord_user.global_name
        ?? presence?.discord_user.username
        ?? "Dipras Alzack"
    const username = presence?.discord_user.username ?? "dipras"
    const statusLabel = !presence
        ? presenceError ? "Discord unavailable" : "Checking Discord"
        : presenceError ? `${meta.label} · Last known` : meta.label

    return (
        <article
            id="discord-information"
            className="scroll-mt-24 bg-linear-to-br from-sky-700 to-sky-900 rounded-3xl shadow-xl shadow-sky-900/20 p-6 md:p-8 text-white relative overflow-hidden">
            <div
                className="absolute top-0 right-0 -mt-10 -mr-10 w-40 h-40 bg-sky-500 rounded-full opacity-20 blur-3xl">
            </div>
            <div
                className="absolute bottom-0 left-0 -mb-10 -ml-10 w-32 h-32 bg-sky-400 rounded-full opacity-10 blur-3xl">
            </div>

            <div className="relative z-10 space-y-6">
                <h3 className="font-display font-bold text-xl">Discord Information</h3>

                <div className="flex items-center gap-4">
                    <div className="relative shrink-0">
                        <Image
                            className="rounded-2xl ring-2 ring-white/20"
                            src={getAvatarUrl(presence)}
                            width={72}
                            height={72}
                            alt={`${displayName}'s Discord profile picture`}
                        />
                        <span className="absolute -right-1 -bottom-1 rounded-full bg-sky-900 p-1 ring-2 ring-sky-800">
                            <PresenceDot status={status} animate={Boolean(presence)} />
                        </span>
                    </div>
                    <div className="min-w-0">
                        <p className="font-bold text-lg truncate">{displayName}</p>
                        <p className="text-sky-200 text-sm truncate">@{username}</p>
                        <p className="text-sky-100 text-xs mt-1" aria-live="polite">
                            {statusLabel}
                            {presence && ` • ${getActiveDevices(presence)}`}
                        </p>
                    </div>
                </div>

                <div className="space-y-3 bg-black/10 rounded-xl p-4 backdrop-blur-sm border border-white/5">
                    <p className="text-[11px] font-bold text-sky-200 uppercase tracking-wider">
                        Current activity
                    </p>
                    <div>
                        <p className="font-bold text-white">
                            {activity
                                ? `${activityVerbs[activity.type] ?? "Active on"} ${activity.name}`
                                : presence ? "No active activity" : "Loading activity..."}
                        </p>
                        {activity && (activity.details || activity.state) && (
                            <p className="text-sm text-sky-100 mt-1 line-clamp-2">
                                {[activity.details, activity.state].filter(Boolean).join(" • ")}
                            </p>
                        )}
                    </div>
                    {activityProgress !== null && (
                        <div className="w-full h-1 bg-sky-900/50 rounded-full overflow-hidden">
                            <div
                                className="h-full bg-sky-300 rounded-full transition-[width] duration-1000"
                                style={{ width: `${activityProgress}%` }}>
                            </div>
                        </div>
                    )}
                </div>

                <a
                    className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-white px-5 py-3 text-sm font-bold text-sky-800 shadow-lg shadow-sky-950/20 transition hover:bg-sky-50 active:scale-[0.98]"
                    href={DISCORD_CHAT_URL}
                    target="_blank"
                    rel="noreferrer">
                    <span className="material-symbols-outlined text-[20px]">chat</span>
                    <span>Chat with me on Discord</span>
                </a>
            </div>
        </article>
    )
}

function PresenceDot({ status, animate }: { status: DiscordStatus, animate: boolean }) {
    const meta = statusMeta[status]

    return (
        <span className="relative flex h-2.5 w-2.5">
            {animate && status !== "offline" && (
                <span
                    className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${meta.ping}`}>
                </span>
            )}
            <span className={`relative inline-flex h-2.5 w-2.5 rounded-full ${meta.dot}`}></span>
        </span>
    )
}
