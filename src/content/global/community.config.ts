export type LiveSessionStatusTone = 'default' | 'focus' | 'warn' | 'success';
export type LiveSessionStatTone = 'hot' | 'live' | 'fire' | 'fast' | 'new' | 'ok';

export interface LiveSessionConsoleIcon {
  className: 'flame' | 'check';
  name: string;
}

export interface LiveSessionConsoleLine {
  command: string;
  output: string;
  blink?: boolean;
  icon?: LiveSessionConsoleIcon;
}

export interface LiveSessionFooterStat {
  icon: string;
  value: string;
  tone?: LiveSessionStatTone;
}

export interface LiveSessionCard {
  index: number;
  title: string;
  status: string;
  statusType: string;
  statusTone?: LiveSessionStatusTone;
  image: string;
  imageAlt: string;
  location: string;
  activityType: string;
  activityMetric: string;
  sessionId: string;
  console: [LiveSessionConsoleLine, LiveSessionConsoleLine, LiveSessionConsoleLine];
  footerStats: [LiveSessionFooterStat, LiveSessionFooterStat, LiveSessionFooterStat];
}

export const liveSessionCards: LiveSessionCard[] = [
  {
    index: 0,
    title: 'REMOTE_SESSION://live',
    status: 'CONNECTED',
    statusType: 'connected',
    statusTone: 'default',
    image: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&h=600&fit=crop&q=90',
    imageAlt: 'Pair Programming',
    location: 'San Francisco, CA',
    activityType: 'Pair Programming',
    activityMetric: '12 watching',
    sessionId: '#SESSION_4F7A9B',
    console: [
      { command: 'session.location', output: 'San Francisco, CA' },
      { command: 'session.type', output: 'Pair Programming' },
      { command: 'active.users', output: '12 watching', blink: true },
    ],
    footerStats: [
      { icon: 'lucide:zap', value: '2hr' },
      { icon: 'lucide:radio', value: '94ms' },
      { icon: 'lucide:flame', value: 'HOT', tone: 'hot' },
    ],
  },
  {
    index: 1,
    title: 'SYNC_PROTOCOL://daily',
    status: 'SYNCING',
    statusType: 'syncing',
    statusTone: 'default',
    image: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?w=800&h=600&fit=crop&q=90',
    imageAlt: 'Team Standup',
    location: 'Berlin, Germany',
    activityType: 'Team Standup',
    activityMetric: '8 members',
    sessionId: '#SYNC_8E2C4D',
    console: [
      { command: 'geo.locate', output: 'Berlin, Germany' },
      { command: 'sync.type', output: 'Team Standup' },
      { command: 'team.size', output: '8 members', blink: true },
    ],
    footerStats: [
      { icon: 'lucide:timer', value: '15m' },
      { icon: 'lucide:radio', value: '52ms' },
      { icon: 'lucide:activity', value: 'LIVE', tone: 'live' },
    ],
  },
  {
    index: 2,
    title: 'FOCUS_MODE://engaged',
    status: 'FOCUSED',
    statusType: 'focused',
    statusTone: 'focus',
    image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=800&h=600&fit=crop&q=90',
    imageAlt: 'Deep Work',
    location: 'Tokyo, Japan',
    activityType: 'Deep Work',
    activityMetric: '4hr',
    sessionId: '#FOCUS_A3D8F1',
    console: [
      { command: 'current.location', output: 'Tokyo, Japan' },
      { command: 'mode.status', output: 'Deep Work' },
      {
        command: 'streak.time',
        output: '4hr',
        blink: true,
        icon: { className: 'flame', name: 'lucide:flame' },
      },
    ],
    footerStats: [
      { icon: 'lucide:target', value: '4hr' },
      { icon: 'lucide:radio', value: '28ms' },
      { icon: 'lucide:flame', value: 'FIRE', tone: 'fire' },
    ],
  },
  {
    index: 3,
    title: 'HACK_EVENT://48h-challenge',
    status: 'BUILDING',
    statusType: 'building',
    statusTone: 'warn',
    image: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=800&h=600&fit=crop&q=90',
    imageAlt: 'Hackathon',
    location: 'London, UK',
    activityType: 'Hackathon',
    activityMetric: '156 active',
    sessionId: '#HACK_9B4E7C',
    console: [
      { command: 'event.location', output: 'London, UK' },
      { command: 'event.type', output: 'Hackathon' },
      { command: 'hackers.count', output: '156 active', blink: true },
    ],
    footerStats: [
      { icon: 'lucide:clock', value: '23h' },
      { icon: 'lucide:radio', value: '71ms' },
      { icon: 'lucide:zap', value: 'FAST', tone: 'fast' },
    ],
  },
  {
    index: 4,
    title: 'IDEATE_SESSION://creative',
    status: 'ACTIVE',
    statusType: 'active',
    statusTone: 'default',
    image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&h=600&fit=crop&q=90',
    imageAlt: 'Brainstorming',
    location: 'Toronto, Canada',
    activityType: 'Brainstorming',
    activityMetric: '24 ideas',
    sessionId: '#IDEA_C7F2A9',
    console: [
      { command: 'session.location', output: 'Toronto, Canada' },
      { command: 'session.mode', output: 'Brainstorming' },
      { command: 'ideas.generated', output: '24 ideas', blink: true },
    ],
    footerStats: [
      { icon: 'lucide:lightbulb', value: '24' },
      { icon: 'lucide:radio', value: '38ms' },
      { icon: 'lucide:sparkles', value: 'NEW', tone: 'new' },
    ],
  },
  {
    index: 5,
    title: 'REVIEW_PROCESS://pr-check',
    status: 'APPROVED',
    statusType: 'approved',
    statusTone: 'success',
    image: 'https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=800&h=600&fit=crop&q=90',
    imageAlt: 'Code Review',
    location: 'Sydney, Australia',
    activityType: 'Code Review',
    activityMetric: '3 PRs',
    sessionId: '#REVIEW_5D9E2B',
    console: [
      { command: 'reviewer.location', output: 'Sydney, Australia' },
      { command: 'review.type', output: 'Code Review' },
      {
        command: 'pr.status',
        output: '3 PRs',
        blink: true,
        icon: { className: 'check', name: 'lucide:check' },
      },
    ],
    footerStats: [
      { icon: 'lucide:git-pull-request', value: '3PR' },
      { icon: 'lucide:radio', value: '124ms' },
      { icon: 'lucide:check-circle', value: 'OK', tone: 'ok' },
    ],
  },
];

export const heroCarouselCards = liveSessionCards.map((session) => ({
  index: session.index,
  title: session.title,
  status: session.status,
  statusType: session.statusType,
  image: session.image,
  imageAlt: session.imageAlt,
  location: session.location,
  activityType: session.activityType,
  activityMetric: session.activityMetric,
  stats: {
    duration: session.footerStats[0].value,
    latency: session.footerStats[1].value,
    status: session.footerStats[2].value,
  },
  sessionId: session.sessionId,
}));

export interface MembershipActivityItem {
  type: string;
  user: string;
  country: string;
  time: string;
  location?: string;
  achievement?: string;
  event?: string;
  action?: string;
}

export const membershipActivityFeed: MembershipActivityItem[] = [
  { type: 'join', user: 'Alex M.', location: 'San Francisco', country: 'us', time: 'Just now' },
  { type: 'certificate', user: 'Yuki T.', achievement: 'React Fundamentals', country: 'jp', time: '2m ago' },
  { type: 'webinar', user: 'Carlos R.', event: 'CSS Grid Mastery', country: 'mx', time: '5m ago' },
  { type: 'mentor', user: 'Emma W.', action: 'matched with mentor', country: 'gb', time: '8m ago' },
  { type: 'job', user: 'Raj P.', achievement: 'Got hired at Microsoft!', country: 'in', time: '12m ago' },
  { type: 'badge', user: 'Sofia L.', achievement: 'Certified Pro badge', country: 'de', time: '15m ago' },
  { type: 'forum', user: 'Chen W.', action: 'answered 10 questions', country: 'cn', time: '18m ago' },
  { type: 'join', user: 'Olga K.', location: 'Warsaw', country: 'pl', time: '22m ago' },
];

export interface MembershipEventSpeaker {
  name: string;
  avatar: string;
  role: string;
}

export interface MembershipEvent {
  title: string;
  type: string;
  date: string;
  speaker: MembershipEventSpeaker;
  attendees: number;
  maxAttendees: number;
  tags: string[];
}

export const membershipEvents: MembershipEvent[] = [
  {
    title: 'Modern CSS Techniques',
    type: 'Webinar',
    date: '2026-02-15T14:00:00',
    speaker: { name: 'Sarah Chen', avatar: 'SC', role: 'CSS Wizard' },
    attendees: 234,
    maxAttendees: 300,
    tags: ['CSS', 'Frontend'],
  },
  {
    title: 'TypeScript Deep Dive',
    type: 'Workshop',
    date: '2026-02-18T11:00:00',
    speaker: { name: 'Mike Johnson', avatar: 'MJ', role: 'TS Expert' },
    attendees: 156,
    maxAttendees: 200,
    tags: ['TypeScript', 'Advanced'],
  },
  {
    title: 'Career AMA',
    type: 'Live Q&A',
    date: '2026-02-20T18:00:00',
    speaker: { name: 'Panel', avatar: 'PA', role: 'Industry Leaders' },
    attendees: 89,
    maxAttendees: 500,
    tags: ['Career', 'Networking'],
  },
];
