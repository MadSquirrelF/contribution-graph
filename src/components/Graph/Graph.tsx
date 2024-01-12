/* eslint-disable react/no-array-index-key */
import { memo, useEffect } from 'react';
import { sub, format, add } from 'date-fns';
import { ru } from 'date-fns/locale/ru';
import { useSelector } from 'react-redux';
import { classNames } from '../../lib/classNames/classNames';
import styles from './Graph.module.scss';
import { Cell } from '../Cell/Cell';
import { useAppDispatch } from '../../Redux/store';
import { selectDateData } from '../../Redux/date/selectors';
import { fetchDates } from '../../Redux/date/asyncActions';
import { Dates } from '../../Redux/date/types';
import { Month } from '../Month/Month';

interface GraphProps {
  className?: string;
}

let resultWeekDays: string[] = [];

export const Graph = memo(({ className }: GraphProps) => {
    const dispatch = useAppDispatch();

    const startDate = format(sub(new Date(), {
        days: 357,
    }), 'yyyy-MM-dd', {
        locale: ru,
    });

    function populateDateArray(n = 7) {
        const daysInAWeek = ['Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб'];

        const returnValue = new Array(n);

        let currentDay = (new Date().getDay());

        for (let i = 0; i < n; i += 1) {
            returnValue[i] = daysInAWeek[(currentDay += 1) % 7];
        }

        return returnValue;
    }

    const { dates } = useSelector(selectDateData);

    const getDates = async () => {
        dispatch(
            fetchDates(),
        );
    };

    useEffect(() => {
        getDates();

        resultWeekDays = populateDateArray();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const months = Array.from(new Array(Math.floor(357 / 7)));

    const data = Array.from(new Array(358)).map((_, index) => {
        const dateEmpty = format(add(startDate, {
            days: index,
        }), 'yyyy-MM-dd', {
            locale: ru,
        });

        const newDate = Object.keys(dates).find((key) => key === dateEmpty);

        if (newDate === undefined) {
            return {
                date: dateEmpty,
                value: 0,
            };
        }
        return {
            date: newDate,
            value: dates[newDate as keyof Dates],
        };
    });

    return (
        <div className={classNames(styles.Graph, {}, [className])}>
            <div className={styles.months}>
                {
                    months.map((_, index) => (
                        <Month key={index} index={index} startDate={startDate} />
                    ))
                }
            </div>

            <div className={styles.container}>
                <div className={styles.weekdays}>
                    {resultWeekDays.map((item, index) => (
                        <div className={styles.day} key={index}>{item}</div>
                    ))}
                </div>

                <div className={styles.wrapper}>
                    <div className={styles.cells}>
                        {data.map((item, index) => (
                            <Cell key={index} date={item.date} contributionsCount={item.value} />
                        ))}
                    </div>

                    <div className={styles.info}>

                        <span>Меньше</span>

                        <div className={styles.example}>
                            <Cell contributionsCount={0} />
                            <Cell contributionsCount={9} interval="1-9" />
                            <Cell contributionsCount={19} interval="10-19" />
                            <Cell contributionsCount={29} interval="20-29" />
                            <Cell contributionsCount={30} interval="30+" />
                        </div>

                        <span>Больше</span>
                    </div>
                </div>

            </div>

        </div>
    );
});
