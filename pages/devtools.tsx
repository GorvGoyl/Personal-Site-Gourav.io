import { AspectRatioCalculator } from '../components/devtools/AspectRatioCalculator';
import { CodeRunner } from '../components/devtools/CodeRunner';
import Header from '../components/Header';
import { Container, LayoutType } from '../components/layout';
import { Links, Navbar } from '../components/navbar';

export default function Devtools() {
    return (
        <>
            <Header
                type="website"
                title="Devtools"
            />

            <Container layout={LayoutType.Devtools}>
                <Navbar link={Links.Blog} />
                <main>
                    <header>
                        <h1>Devtools</h1>
                    </header>
                    <div>
                        <AspectRatioCalculator />
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
