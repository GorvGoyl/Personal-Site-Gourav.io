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

    // Two gentle beeps at 440Hz (A4)
    for (let i = 0; i < 2; i++) {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.value = 440;
        const start = now + i * 0.25;
        gain.gain.setValueAtTime(0.3, start);
        gain.gain.exponentialRampToValueAtTime(0.01, start + 0.15);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(start);
        osc.stop(start + 0.15);
    }
}

export function playEndTone(ctx: AudioContext): void {
    const now = ctx.currentTime;
    const frequencies = [523, 659, 784]; // C5, E5, G5

    for (let i = 0; i < frequencies.length; i++) {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'square';
        osc.frequency.value = frequencies[i];
        const start = now + i * 0.25;
        gain.gain.setValueAtTime(0.4, start);
        gain.gain.exponentialRampToValueAtTime(0.01, start + 0.2);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(start);
        osc.stop(start + 0.2);
    }
}
