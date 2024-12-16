export function Button(props: { children: React.ReactNode; onClick: () => void }) {
    return (
        <button
            type="button"
            onClick={props.onClick}
            className="text-md rounded bg-neutral-800 p-2 text-base text-neutral-100 drop-shadow hover:bg-neutral-900">
            {props.children}
        </button>
    );
}
