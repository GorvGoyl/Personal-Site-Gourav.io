import Head from 'next/head';
import { useEffect } from 'react';

// Werewolf GM moved to its own Vercel project (repo GorvGoyl/werewolf)
const NEW_HOME = 'https://gorv-werewolf.vercel.app/';

// Sends visitors to the new home. Player names and role names saved by the old version live in
// this site's localStorage, which the new app can't read, so they're handed over once in the URL hash.
// Plain ES5 so it can run inline before the page hydrates; the flag stops it from running twice.
const HAND_OFF_SCRIPT = `(function () {
  if (window.__werewolfHandOff) return;
  window.__werewolfHandOff = true;
  var hash = '';
  try {
    var raw = localStorage.getItem('werewolf-game');
    if (raw) {
      var saved = JSON.parse(raw);
      var names = (saved.players || []).map(function (p) { return p && p.name; }).filter(Boolean);
      var payload = { v: 1, names: names, roleNames: saved.roleNames || {}, timerMinutes: saved.timerMinutes, gameConfig: saved.gameConfig };
      hash = '#import=' + encodeURIComponent(JSON.stringify(payload));
      localStorage.setItem('werewolf-game-moved', raw);
      localStorage.removeItem('werewolf-game');
    }
  } catch (e) {}
  if (!hash && window.location.hash === '#rules') hash = '#rules';
  window.location.replace(${JSON.stringify(NEW_HOME)} + hash);
})();`;

export default function WerewolfMovedPage() {
    // After a client-side navigation the inline script below never runs, so run it from here
    useEffect(() => {
        const script = document.createElement('script');
        script.text = HAND_OFF_SCRIPT;
        document.body.appendChild(script);
    }, []);

    return (
        <>
            <Head>
                <title>Werewolf GM has moved</title>
                <meta
                    name="robots"
                    content="noindex"
                />
                <link
                    rel="canonical"
                    href={NEW_HOME}
                />
            </Head>
            <script dangerouslySetInnerHTML={{ __html: HAND_OFF_SCRIPT }} />
            <main className="flex min-h-screen items-center justify-center bg-[#070816] px-6 text-center text-slate-200">
                <p>
                    Werewolf GM has moved to{' '}
                    <a
                        href={NEW_HOME}
                        className="font-semibold text-violet-300 underline">
                        gorv-werewolf.vercel.app
                    </a>
                </p>
            </main>
        </>
    );
}
