import { useEffect, useRef, useState } from 'react';
import {
  MdPlayArrow,
  MdPause,
  MdNavigateBefore,
  MdNavigateNext,
} from 'react-icons/md';
import Reveal from '../layout/Reveal';
import './ServiceVideos.css';

const videos = [
  {
    id: 'general-dentistry',
    service: 'General Dentistry',
    title: 'A Routine Dental Checkup, Step by Step',
    duration: '22 min',
    color: '#0f7d6d',
    src: '/videos/svc-general.mp4',
    poster: '/videos/svc-general-poster.jpg',
    credit: 'Nova Smiles | The Online Dentist',
    channel: 'https://www.youtube.com/channel/UCs0dj62D3YyAWjMLgG_E1tw',
  },
  {
    id: 'cosmetic-dentistry',
    service: 'Cosmetic Dentistry',
    title: 'How Veneers Are Placed',
    duration: '2 min',
    color: '#3fb5a0',
    src: '/videos/svc-cosmetic.mp4',
    poster: '/videos/svc-cosmetic-poster.jpg',
    credit: 'Cleveland Clinic',
    channel: 'https://www.youtube.com/channel/UCxyiSz4m161Z6frOsFxJpgw',
  },
  {
    id: 'orthodontics',
    service: 'Orthodontics',
    title: 'How Clear Aligners Straighten Teeth',
    duration: '1 min',
    color: '#c9a84c',
    src: '/videos/svc-ortho.mp4',
    poster: '/videos/svc-ortho-poster.jpg',
    credit: 'Invisalign Europe',
    channel: 'https://www.youtube.com/channel/UCOSwo1MP0KAEjxLJxoeN43A',
  },
  {
    id: 'dental-implants',
    service: 'Dental Implants',
    title: 'Dental Implant Procedure — Medical Animation',
    duration: '6 min',
    color: '#4c86c0',
    src: '/videos/svc-implant.mp4',
    poster: '/videos/svc-implant-poster.jpg',
    credit: 'Gebrüder Betz Medical Animation',
    channel: 'https://www.youtube.com/channel/UCv2RYNPXHuf_bLF4WNjT3ow',
  },
  {
    id: 'teeth-whitening',
    service: 'Teeth Whitening',
    title: 'Professional Teeth Whitening at the Dentist',
    duration: '6 min',
    color: '#26a69a',
    src: '/videos/svc-whitening.mp4',
    poster: '/videos/svc-whitening-poster.jpg',
    credit: 'Dr. Joyce Kahng',
    channel: 'https://www.youtube.com/channel/UCSYxaX3vs3i7jyzmZBSAGKg',
  },
  {
    id: 'emergency-care',
    service: 'Emergency Care',
    title: 'Dental Emergencies: What You Need to Know',
    duration: '1 min',
    color: '#e27b6a',
    src: '/videos/svc-emergency.mp4',
    poster: '/videos/svc-emergency-poster.jpg',
    credit: 'Nuffield Dental',
    channel: 'https://www.youtube.com/channel/UCdKlZALfRxck2wv9I4uSxCw',
  },
];

const pad = n => String(n).padStart(2, '0');

export default function ServiceVideos() {
  const [activeId, setActiveId] = useState(videos[0].id);
  const [playing, setPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [dragging, setDragging] = useState(false);
  const videoRef = useRef(null);
  const scrubRef = useRef(null);

  const activeIndex = videos.findIndex(v => v.id === activeId);
  const active = videos[activeIndex];
  const prev = videos[(activeIndex - 1 + videos.length) % videos.length];
  const next = videos[(activeIndex + 1) % videos.length];

  const fmt = s => {
    if (!Number.isFinite(s) || s < 0) return '0:00';
    const m = Math.floor(s / 60);
    const sec = Math.floor(s % 60).toString().padStart(2, '0');
    return `${m}:${sec}`;
  };

  const pct = duration > 0 ? (currentTime / duration) * 100 : 0;

  useEffect(() => {
    const v = videoRef.current;
    if (v) {
      v.pause();
      v.load();
    }
  }, [activeId]);

  const selectVideo = id => {
    setPlaying(false);
    setCurrentTime(0);
    setDuration(0);
    setActiveId(id);
  };

  const toggle = () => {
    const v = videoRef.current;
    if (!v) return;
    if (playing) v.pause();
    else v.play();
  };

  const getRatio = e => {
    const bar = scrubRef.current;
    if (!bar) return 0;
    const rect = bar.getBoundingClientRect();
    return Math.min(1, Math.max(0, (e.clientX - rect.left) / rect.width));
  };

  const seekTo = pctValue => {
    const v = videoRef.current;
    if (!v || !Number.isFinite(v.duration)) return;
    v.currentTime = pctValue * v.duration;
    setCurrentTime(v.currentTime);
  };

  const scrubStart = e => {
    e.preventDefault();
    e.stopPropagation();
    setDragging(true);
    seekTo(getRatio(e));
    scrubRef.current?.setPointerCapture?.(e.pointerId);
  };

  const scrubMove = e => {
    if (dragging) seekTo(getRatio(e));
  };

  const scrubEnd = () => setDragging(false);

  return (
    <section className="videos section-pad" id="services-videos">
      <div className="container">
        <Reveal className="section-header">
          <h2 className="section-title">See Each Procedure <span>in Action</span></h2>
          <p className="section-subtitle">Not sure what a treatment involves? Watch a short, easy-to-follow guide for the service you're interested in before booking.</p>
        </Reveal>

        <div className="videos-hub">
          <Reveal className="videos-stage">
            <div className="video-player" style={{ '--svc-accent': active.color }}>
              <div className="video-player-head">
                <span className={`video-player-now${playing ? ' is-live' : ''}`}>
                  <span className="video-player-dot" />
                  {playing ? 'Now playing' : 'Paused'}
                </span>
                <span className="video-player-svc">{active.service}</span>
              </div>

              <div className="video-player-screen">
                <video
                  ref={videoRef}
                  className="video-player-video"
                  src={active.src}
                  poster={active.poster}
                  preload="metadata"
                  playsInline
                  onClick={toggle}
                  onPlay={() => setPlaying(true)}
                  onPause={() => setPlaying(false)}
                  onEnded={() => setPlaying(false)}
                  onTimeUpdate={e => setCurrentTime(e.currentTarget.currentTime)}
                  onLoadedMetadata={e => setDuration(e.currentTarget.duration)}
                />

                {Number.isFinite(duration) && duration > 0 && (
                  <div
                    className="video-player-timeline"
                    ref={scrubRef}
                    onPointerDown={scrubStart}
                    onPointerMove={scrubMove}
                    onPointerUp={scrubEnd}
                    onPointerCancel={scrubEnd}
                  >
                    <div className="video-player-times">
                      <span>{fmt(currentTime)}</span>
                      <span>/ {fmt(duration)}</span>
                    </div>
                    <div className="video-player-seek">
                      <div className="video-player-seek-track">
                        <div
                          className="video-player-seek-fill"
                          style={{ width: `${pct}%` }}
                        />
                      </div>
                      <span
                        className="video-player-seek-thumb"
                        aria-hidden="true"
                        style={{ left: `${pct}%` }}
                      />
                    </div>
                  </div>
                )}

                <button
                  type="button"
                  className="video-toggle-fab"
                  onClick={toggle}
                  aria-label={playing ? 'Pause' : 'Play'}
                >
                  {playing ? <MdPause /> : <MdPlayArrow />}
                </button>
              </div>

              <div className="video-player-foot">
                <div className="video-player-meta">
                  <span className="video-player-idx">{pad(activeIndex + 1)}</span>
                  <div className="video-player-titles">
                    <h3>{active.title}</h3>
                    <span className="video-player-duration">{active.duration}</span>
                  </div>
                </div>
                <div className="video-player-controls">
                  <button
                    type="button"
                    className="video-player-nav"
                    onClick={() => selectVideo(prev.id)}
                    aria-label={`Previous video: ${prev.title}`}
                  >
                    <MdNavigateBefore />
                  </button>
                  <button
                    type="button"
                    className="video-player-nav"
                    onClick={() => selectVideo(next.id)}
                    aria-label={`Next video: ${next.title}`}
                  >
                    <MdNavigateNext />
                  </button>
                </div>
              </div>

              <p className="video-player-credit">
                Video courtesy of <a href={active.channel} target="_blank" rel="noopener noreferrer">{active.credit}</a> on YouTube
              </p>
            </div>
          </Reveal>

          <div className="videos-playlist">
            {videos.map((v, i) => {
              const isActive = v.id === activeId;
              return (
                <Reveal key={v.id} delay={i * 0.05} className="vplay-wrap">
                  <button
                    type="button"
                    className={`vplay-item${isActive ? ' is-active' : ''}`}
                    style={{ '--svc-accent': v.color }}
                    onClick={() => selectVideo(v.id)}
                    aria-current={isActive ? 'true' : undefined}
                  >
                    <span className="vplay-idx">{pad(i + 1)}</span>
                    <span className="vplay-thumb">
                      <img src={v.poster} alt="" loading="lazy" />
                      {isActive ? (
                        <span className="vplay-eq" aria-hidden="true">
                          <i /><i /><i />
                        </span>
                      ) : (
                        <span className="vplay-miniplay" aria-hidden="true"><MdPlayArrow /></span>
                      )}
                    </span>
                    <span className="vplay-body">
                      <span className="vplay-service">{v.service}</span>
                      <span className="vplay-title">{v.title}</span>
                    </span>
                    <span className="vplay-duration">{v.duration}</span>
                  </button>
                </Reveal>
              );
            })}
          </div>
        </div>

        <Reveal className="videos-note">
          <p>Educational videos for each procedure to help you understand your treatment — always confirm details with our team.</p>
        </Reveal>
      </div>
    </section>
  );
}