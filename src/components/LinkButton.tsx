export default function LinkButton({
    link,
    text,
}: {
    link: string
    text: string
}) {
    return (
        <a
            href={link}
            className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
            target="_blank"
            rel="noopener noreferrer"
        >
            <h2 className="text-2xl font-semibold flex flex-wrap justify-between gap-4">
                {`${text} `}
                <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
                    -&gt;
                </span>
            </h2>
        </a>
    )
}
