import { AspectRatioCalculator } from '../components/devtools/AspectRatioCalculator';
import { CharacterLengthCalculator } from '../components/devtools/CharacterLengthCalculator';
import { CodeRunner } from '../components/devtools/CodeRunner';
import { LLMTokenCounter } from '../components/devtools/LLMTokenCounter';
import { UuidGenerator } from '../components/devtools/UuidGenerator';
import Header from '../components/Header';
import { Container, LayoutType } from '../components/layout';
import { Links, Navbar } from '../components/navbar';

export default function Devtools() {
    return (
        <>
            <Header
                type="website"
                title="Devtools - Code runner, LLM token counter, Aspect ratio calculator, etc."
            />

            <Container layout={LayoutType.Devtools}>
                <Navbar link={Links.Blog} />
                <main>
                    <header>
                        <h1>Devtools</h1>
                    </header>
                    <div className="mt-10">
                        <div className="inline-flex flex-col gap-5 md:flex-row">
                            <AspectRatioCalculator />
                            <CharacterLengthCalculator />
                            <UuidGenerator />
                            <LLMTokenCounter />
                        </div>
                        <CodeRunner />
                    </div>
                </main>
                <div className="mb-[-20px] mt-20 text-center text-xs text-neutral-500 underline">
                    <a
                        target="_blank"
                        href="https://github.com/GorvGoyl/Personal-Site-Gourav.io/issues">
                        Suggest more tools
                    </a>
                </div>
            </Container>
        </>
    );
}
