import { FullYearCalendar } from '../components/FullYearCalendar';
import Header from '../components/Header';
import { Container, LayoutType } from '../components/layout';
import { Links, Navbar } from '../components/navbar';

export default function CalendarPage() {
    return (
        <>
            <Header
                type="website"
                title="Full Year Calendar - Plan your year and add notes to any date"
            />

            <Container layout={LayoutType.Blog}>
                <Navbar link={Links.Blog} />
                <main>
                    <h1 className="mb-6 text-2xl font-semibold">Full Year Calendar</h1>
                    <FullYearCalendar />
                </main>
            </Container>
        </>
    );
}
