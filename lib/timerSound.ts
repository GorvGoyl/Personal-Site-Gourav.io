import type { MutableRefObject } from 'react';

export function getOrCreateAudioContext(ref: MutableRefObject<AudioContext | null>): AudioContext {
    if (!ref.current) {
        ref.current = new AudioContext();
    }
    if (ref.current.state === 'suspended') {
        ref.current.resume();
    }
    return ref.current;
}

export function playReminderTone(ctx: AudioContext): void {
    const now = ctx.currentTime;

    // Two soft chime-like tones (C5 → G5) — gentle but audible
    const frequencies = [523, 784];
    for (let i = 0; i < frequencies.length; i++) {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.value = frequencies[i];
        const start = now + i * 0.4;
        gain.gain.setValueAtTime(0.8, start);
        gain.gain.exponentialRampToValueAtTime(0.01, start + 0.5);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(start);
        osc.stop(start + 0.5);
    }
}

export function playEndTone(ctx: AudioContext): void {
    const now = ctx.currentTime;

    // Quick ascending triad (C5 → E5 → G5)
    const frequencies = [523, 659, 784];
    for (let i = 0; i < frequencies.length; i++) {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'triangle';
        osc.frequency.value = frequencies[i];
        const start = now + i * 0.2;
        gain.gain.setValueAtTime(1.0, start);
        gain.gain.exponentialRampToValueAtTime(0.01, start + 0.3);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(start);
        osc.stop(start + 0.3);
    }
}
