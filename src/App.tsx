import { sub, add, format } from 'date-fns';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { ru } from 'date-fns/locale/ru';
import { Graph } from './components/Graph/Graph';
import { fetchDates } from './Redux/date/asyncActions';
import { useAppDispatch } from './Redux/store';
import { selectDateData } from './Redux/date/selectors';

function App() {
    const dispatch = useAppDispatch();

    const startDate = format(sub(new Date(), {
        days: 365,
    }), 'yyyy-MM-dd', {
        locale: ru,
    });

    const { status, dates } = useSelector(selectDateData);

    const getDates = async () => {
        dispatch(
            fetchDates(),
        );
    };

    useEffect(() => {
        getDates();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const dateRange = [startDate, format(new Date(), 'yyyy-MM-dd', {
        locale: ru,
    })];

    const dataEmpty = Array.from(new Array(365)).map((_, index) => ({
        date: add(startDate, {
            days: index,
        }),
        value: 0,
    }));

    return (
        <div className="app">
            <Graph range={dateRange} data={dataEmpty} />
        </div>
    );
}

export default App;
