interface LiveWorldMapPanelRuntimeOptions {
  container?: HTMLElement | null;
  isActive?: () => boolean;
  mapSvgUrl?: string;
}

type HotspotPosition = {
  x: number;
  y: number;
  el: HTMLElement;
};

const DEFAULT_MAP_SVG_URL = '/wm.svg';
const MAP_VIEWBOX_WIDTH = 1016.371;
const MAP_VIEWBOX_HEIGHT = 514.609;
const DEFAULT_CYAN_400_RGB = '34, 211, 238';
const SVG_NAMESPACE = 'http://www.w3.org/2000/svg';

const COUNTRY_NAMES: Record<string, string> = {
  AF: 'Afghanistan', AL: 'Albania', DZ: 'Algeria', AO: 'Angola', AR: 'Argentina',
  AM: 'Armenia', AU: 'Australia', AT: 'Austria', AZ: 'Azerbaijan', BD: 'Bangladesh',
  BY: 'Belarus', BE: 'Belgium', BO: 'Bolivia', BA: 'Bosnia', BR: 'Brazil',
  BG: 'Bulgaria', KH: 'Cambodia', CM: 'Cameroon', CA: 'Canada', CL: 'Chile',
  CN: 'China', CO: 'Colombia', CD: 'DR Congo', HR: 'Croatia', CU: 'Cuba',
  CZ: 'Czechia', DK: 'Denmark', DO: 'Dominican Rep.', EC: 'Ecuador', EG: 'Egypt',
  EE: 'Estonia', ET: 'Ethiopia', FI: 'Finland', FR: 'France', GE: 'Georgia',
  DE: 'Germany', GH: 'Ghana', GR: 'Greece', GT: 'Guatemala', HN: 'Honduras',
  HU: 'Hungary', IS: 'Iceland', IN: 'India', ID: 'Indonesia', IR: 'Iran',
  IQ: 'Iraq', IE: 'Ireland', IL: 'Israel', IT: 'Italy', JP: 'Japan',
  JO: 'Jordan', KZ: 'Kazakhstan', KE: 'Kenya', KR: 'South Korea', KW: 'Kuwait',
  LV: 'Latvia', LB: 'Lebanon', LY: 'Libya', LT: 'Lithuania', MY: 'Malaysia',
  MX: 'Mexico', MA: 'Morocco', MZ: 'Mozambique', MM: 'Myanmar', NP: 'Nepal',
  NL: 'Netherlands', NZ: 'New Zealand', NG: 'Nigeria', NO: 'Norway', OM: 'Oman',
  PK: 'Pakistan', PA: 'Panama', PY: 'Paraguay', PE: 'Peru', PH: 'Philippines',
  PL: 'Poland', PT: 'Portugal', QA: 'Qatar', RO: 'Romania', RU: 'Russia',
  SA: 'Saudi Arabia', SN: 'Senegal', RS: 'Serbia', SG: 'Singapore', SK: 'Slovakia',
  SI: 'Slovenia', ZA: 'South Africa', ES: 'Spain', LK: 'Sri Lanka', SE: 'Sweden',
  CH: 'Switzerland', SY: 'Syria', TW: 'Taiwan', TZ: 'Tanzania', TH: 'Thailand',
  TN: 'Tunisia', TR: 'Turkey', UA: 'Ukraine', AE: 'UAE', GB: 'United Kingdom',
  US: 'United States', UY: 'Uruguay', UZ: 'Uzbekistan', VE: 'Venezuela',
  VN: 'Vietnam', YE: 'Yemen', ZM: 'Zambia', ZW: 'Zimbabwe',
  USA: 'United States', GBR: 'United Kingdom', FRA: 'France', DEU: 'Germany',
  BRA: 'Brazil', IND: 'India', CHN: 'China', JPN: 'Japan', AUS: 'Australia',
  CAN: 'Canada', RUS: 'Russia', KOR: 'South Korea', MEX: 'Mexico', IDN: 'Indonesia',
  TUR: 'Turkey', NGA: 'Nigeria', EGY: 'Egypt', ZAF: 'South Africa', ARG: 'Argentina',
  COL: 'Colombia', ESP: 'Spain', ITA: 'Italy', POL: 'Poland', UKR: 'Ukraine',
};

const toRgba = (rgb: string, alpha: number): string => `rgba(${rgb}, ${alpha})`;

function getCountryName(pathEl: Element): string | null {
  const id = (pathEl.getAttribute('id') || '').toUpperCase();
  const className = (pathEl.getAttribute('class') || '')
    .replace('country-path', '')
    .trim()
    .toUpperCase();
  const explicitName = pathEl.getAttribute('data-name') || pathEl.getAttribute('name');

  if (explicitName) {
    return explicitName;
  }

  if (COUNTRY_NAMES[id]) {
    return COUNTRY_NAMES[id];
  }

  if (COUNTRY_NAMES[className]) {
    return COUNTRY_NAMES[className];
  }

  const firstClassToken = className.split(/\s+/)[0];
  return COUNTRY_NAMES[firstClassToken] ?? null;
}

export function initLiveWorldMapPanel(
  mapStateEl: HTMLElement,
  options: LiveWorldMapPanelRuntimeOptions = {},
): () => void {
  if (mapStateEl.dataset.liveWorldMapInitialized === 'true') {
    return () => {};
  }
  mapStateEl.dataset.liveWorldMapInitialized = 'true';

  const container =
    options.container ??
    mapStateEl.closest<HTMLElement>('[data-map-interaction-container]') ??
    mapStateEl;
  const isActive = options.isActive ?? (() => mapStateEl.classList.contains('visible'));
  const mapSvgUrl = options.mapSvgUrl ?? DEFAULT_MAP_SVG_URL;

  const mapSvg = mapStateEl.querySelector<SVGSVGElement>('.world-map');
  const mapPaths = mapStateEl.querySelector<SVGGElement>('.map-paths');
  const arcsGroup = mapStateEl.querySelector<SVGGElement>('.map-arcs-g');
  const dataFlowGroup = mapStateEl.querySelector<SVGGElement>('.map-data-flow');
  const spotlight = mapStateEl.querySelector<SVGCircleElement>('.map-spotlight');
  const tooltip = mapStateEl.querySelector<HTMLElement>('.map-tooltip');
  const tooltipCity = mapStateEl.querySelector<HTMLElement>('.tooltip-city');
  const tooltipInfo = mapStateEl.querySelector<HTMLElement>('.tooltip-info');
  const tooltipFlag = mapStateEl.querySelector<HTMLImageElement>('.tooltip-flag');
  const hotspotsContainer = mapStateEl.querySelector<HTMLElement>('.map-hotspots');
  const pingsContainer = mapStateEl.querySelector<HTMLElement>('.map-pings');
  const onlineCount = mapStateEl.querySelector<HTMLElement>('.online-count');
  const activityCount = mapStateEl.querySelector<HTMLElement>('.activity-count');

  const rootStyles = getComputedStyle(document.documentElement);
  const cyan400Rgb = rootStyles.getPropertyValue('--cyan-400-rgb').trim() || DEFAULT_CYAN_400_RGB;
  const cleanupCallbacks: Array<() => void> = [];
  const hotspotPositions: HotspotPosition[] = [];

  const addListener = (
    target: EventTarget | null | undefined,
    eventName: string,
    handler: EventListenerOrEventListenerObject,
    listenerOptions?: AddEventListenerOptions | boolean,
  ) => {
    if (!target) {
      return;
    }
    target.addEventListener(eventName, handler, listenerOptions);
    cleanupCallbacks.push(() => {
      target.removeEventListener(eventName, handler, listenerOptions);
    });
  };

  function moveTooltip(event: MouseEvent) {
    if (!tooltip) {
      return;
    }
    const rect = container.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    tooltip.style.left = `${x + 15}px`;
    tooltip.style.top = `${y - 10}px`;
  }

  function setTooltipFlag(countryCode: string | null | undefined) {
    if (!tooltipFlag) {
      return;
    }

    const normalized = (countryCode || '').trim().toLowerCase();
    if (/^[a-z]{2}$/.test(normalized)) {
      tooltipFlag.src = `https://flagcdn.com/${normalized}.svg`;
      tooltipFlag.alt = `${normalized.toUpperCase()} Flag`;
      tooltipFlag.classList.add('visible');
      return;
    }

    tooltipFlag.removeAttribute('src');
    tooltipFlag.alt = '';
    tooltipFlag.classList.remove('visible');
  }

  function showTooltip(
    city: string | null,
    info: string | null,
    event: MouseEvent,
    countryCode: string | null = null,
  ) {
    if (!tooltip || !tooltipCity) {
      return;
    }
    tooltipCity.textContent = city ?? '';
    setTooltipFlag(countryCode);
    if (tooltipInfo) {
      tooltipInfo.textContent = info ?? '';
    }
    const tooltipBody = tooltipInfo?.parentElement;
    if (tooltipBody) {
      tooltipBody.style.display = info ? 'flex' : 'none';
    }
    tooltip.classList.add('visible');
    moveTooltip(event);
  }

  function hideTooltip() {
    tooltip?.classList.remove('visible');
  }

  function clearConnectionArcs() {
    arcsGroup?.querySelectorAll('.connection-arc').forEach((arc) => arc.remove());
    if (dataFlowGroup) {
      dataFlowGroup.innerHTML = '';
    }
    hotspotPositions.forEach(({ el }) => {
      el.classList.remove('connected');
    });
  }

  function createDataFlowOnArc(pathD: string, index: number) {
    if (!dataFlowGroup) {
      return;
    }

    const particle = document.createElementNS(SVG_NAMESPACE, 'circle');
    particle.setAttribute('r', '4');
    particle.setAttribute('fill', 'var(--accent)');
    particle.setAttribute('class', 'data-particle');

    const animateMotion = document.createElementNS(SVG_NAMESPACE, 'animateMotion');
    animateMotion.setAttribute('dur', '1.2s');
    animateMotion.setAttribute('repeatCount', 'indefinite');
    animateMotion.setAttribute('path', pathD);
    animateMotion.setAttribute('begin', `${index * 0.2}s`);
    particle.appendChild(animateMotion);
    dataFlowGroup.appendChild(particle);

    const trail = document.createElementNS(SVG_NAMESPACE, 'circle');
    trail.setAttribute('r', '2');
    trail.setAttribute('fill', toRgba(cyan400Rgb, 0.6));
    trail.setAttribute('class', 'data-particle');

    const trailMotion = document.createElementNS(SVG_NAMESPACE, 'animateMotion');
    trailMotion.setAttribute('dur', '1.2s');
    trailMotion.setAttribute('repeatCount', 'indefinite');
    trailMotion.setAttribute('path', pathD);
    trailMotion.setAttribute('begin', `${index * 0.2 + 0.1}s`);
    trail.appendChild(trailMotion);
    dataFlowGroup.appendChild(trail);
  }

  function drawConnectionArcs(fromX: number, fromY: number) {
    clearConnectionArcs();
    if (!arcsGroup) {
      return;
    }

    const nearestHotspots = hotspotPositions
      .filter((hotspot) => hotspot.x !== fromX || hotspot.y !== fromY)
      .map((hotspot) => ({ ...hotspot, distance: Math.hypot(hotspot.x - fromX, hotspot.y - fromY) }))
      .sort((a, b) => a.distance - b.distance)
      .slice(0, 4);

    nearestHotspots.forEach((targetHotspot, index) => {
      const x1 = (fromX / 100) * MAP_VIEWBOX_WIDTH;
      const y1 = (fromY / 100) * MAP_VIEWBOX_HEIGHT;
      const x2 = (targetHotspot.x / 100) * MAP_VIEWBOX_WIDTH;
      const y2 = (targetHotspot.y / 100) * MAP_VIEWBOX_HEIGHT;
      const midX = (x1 + x2) / 2;
      const distance = Math.hypot(x2 - x1, y2 - y1);
      const curveHeight = Math.min(80, distance * 0.2);
      const midY = Math.min(y1, y2) - curveHeight - 20;
      const pathD = `M${x1},${y1} Q${midX},${midY} ${x2},${y2}`;

      const path = document.createElementNS(SVG_NAMESPACE, 'path');
      path.setAttribute('d', pathD);
      path.setAttribute('fill', 'none');
      path.setAttribute('stroke', index % 2 === 0 ? 'url(#arcGrad)' : 'url(#arcGradAlt)');
      path.setAttribute('stroke-width', '2.5');
      path.setAttribute('class', 'connection-arc');
      path.style.filter = 'url(#glow)';

      let totalLength = 200;
      try {
        totalLength = path.getTotalLength();
      } catch {
        totalLength = 200;
      }

      path.style.strokeDasharray = String(totalLength);
      path.style.strokeDashoffset = String(totalLength);
      arcsGroup.appendChild(path);

      window.setTimeout(() => {
        path.style.strokeDashoffset = '0';
      }, index * 80);

      createDataFlowOnArc(pathD, index);
      targetHotspot.el.classList.add('connected');
    });
  }

  function initializeHotspots() {
    const hotspots = hotspotsContainer?.querySelectorAll<HTMLElement>('.hotspot');
    hotspots?.forEach((hotspot) => {
      const x = parseFloat(hotspot.style.left || '0');
      const y = parseFloat(hotspot.style.top || '0');
      hotspotPositions.push({ x, y, el: hotspot });

      addListener(hotspot, 'mouseenter', (event) => {
        hotspot.classList.add('active');
        const city = hotspot.getAttribute('data-city');
        const info = hotspot.getAttribute('data-info');
        const countryCode = hotspot.getAttribute('data-country-code');
        showTooltip(city, info, event as MouseEvent, countryCode);
        drawConnectionArcs(x, y);
      });

      addListener(hotspot, 'mousemove', (event) => {
        moveTooltip(event as MouseEvent);
      });

      addListener(hotspot, 'mouseleave', () => {
        hotspot.classList.remove('active');
        hideTooltip();
        clearConnectionArcs();
      });
    });
  }

  async function loadMapSvg() {
    if (!mapPaths) {
      return;
    }
    try {
      const response = await fetch(mapSvgUrl);
      if (!response.ok) {
        throw new Error(`Failed to load map SVG: ${response.status}`);
      }

      const svgText = await response.text();
      const parser = new DOMParser();
      const svgDoc = parser.parseFromString(svgText, 'image/svg+xml');
      const svgElement = svgDoc.querySelector('svg');
      const paths = svgElement?.querySelectorAll('path');

      if (!paths) {
        return;
      }

      mapPaths.innerHTML = '';
      paths.forEach((path, index) => {
        const clonedPath = path.cloneNode(true) as SVGPathElement;
        clonedPath.style.animationDelay = `${index * 4}ms`;
        clonedPath.classList.add('country-path');
        clonedPath.removeAttribute('style');
        clonedPath.removeAttribute('fill');
        clonedPath.removeAttribute('stroke');
        mapPaths.appendChild(clonedPath);
      });

      mapPaths.querySelectorAll<SVGPathElement>('.country-path').forEach((path) => {
        addListener(path, 'mouseenter', (event) => {
          path.classList.add('hovered');
          const countryName = getCountryName(path);
          if (countryName) {
            showTooltip(countryName, null, event as MouseEvent, null);
          }
        });

        addListener(path, 'mousemove', (event) => {
          moveTooltip(event as MouseEvent);
        });

        addListener(path, 'mouseleave', () => {
          path.classList.remove('hovered');
          hideTooltip();
        });
      });
    } catch (error) {
      console.error('Map loading error:', error);
    }
  }

  function renderAmbientArcs() {
    if (!arcsGroup) {
      return;
    }
    arcsGroup.querySelectorAll('.arc-path').forEach((arc) => arc.remove());
    const ambientArcPaths = [
      'M508,200 Q600,80 750,180',
      'M508,200 Q400,100 250,150',
      'M508,200 Q550,320 700,350',
      'M508,200 Q450,280 300,320',
      'M250,150 Q400,200 508,200',
      'M750,180 Q650,250 508,200',
    ];

    ambientArcPaths.forEach((pathD, index) => {
      const arc = document.createElementNS(SVG_NAMESPACE, 'path');
      arc.setAttribute('d', pathD);
      arc.setAttribute('fill', 'none');
      arc.setAttribute('stroke', `url(#${index % 2 === 0 ? 'arcGrad' : 'arcGradAlt'})`);
      arc.setAttribute('stroke-width', '1.5');
      arc.classList.add('arc-path');
      arc.style.animationDelay = `${index * 0.8}s`;
      arcsGroup.appendChild(arc);
    });
  }

  function updateLiveStats() {
    if (onlineCount) {
      onlineCount.textContent = String(350 + Math.floor(Math.random() * 40));
    }
    if (activityCount) {
      activityCount.textContent = String(20 + Math.floor(Math.random() * 10));
    }
  }

  function createRandomPing() {
    if (!pingsContainer || !isActive()) {
      return;
    }
    const ping = document.createElement('div');
    ping.className = 'map-ping';
    ping.style.left = `${10 + Math.random() * 80}%`;
    ping.style.top = `${15 + Math.random() * 70}%`;
    pingsContainer.appendChild(ping);
    window.setTimeout(() => ping.remove(), 2500);
  }

  if (container && mapSvg && spotlight) {
    addListener(container, 'mousemove', (event) => {
      if (!isActive()) {
        return;
      }
      const mouseEvent = event as MouseEvent;
      const rect = mapSvg.getBoundingClientRect();
      const mappedX = ((mouseEvent.clientX - rect.left) / rect.width) * MAP_VIEWBOX_WIDTH;
      const mappedY = ((mouseEvent.clientY - rect.top) / rect.height) * MAP_VIEWBOX_HEIGHT;
      spotlight.setAttribute('cx', String(mappedX));
      spotlight.setAttribute('cy', String(mappedY));
      spotlight.setAttribute('opacity', '1');
    });

    addListener(container, 'mouseleave', () => {
      spotlight.setAttribute('opacity', '0');
    });
  }

  initializeHotspots();
  renderAmbientArcs();
  void loadMapSvg();

  const pingInterval = window.setInterval(createRandomPing, 1500);
  const statsInterval = window.setInterval(updateLiveStats, 3000);
  cleanupCallbacks.push(() => window.clearInterval(pingInterval));
  cleanupCallbacks.push(() => window.clearInterval(statsInterval));

  return () => {
    cleanupCallbacks.forEach((callback) => callback());
    clearConnectionArcs();
    mapStateEl.dataset.liveWorldMapInitialized = 'false';
  };
}

export function initLiveWorldMapPanels(root: ParentNode = document): void {
  root.querySelectorAll<HTMLElement>('[data-live-world-map]').forEach((mapPanel) => {
    initLiveWorldMapPanel(mapPanel);
  });
}
