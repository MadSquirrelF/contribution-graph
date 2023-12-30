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

export const Graph = memo(({ className }: GraphProps) => {
    const dispatch = useAppDispatch();

    const startDate = format(sub(new Date(), {
        days: 365,
    }), 'yyyy-MM-dd', {
        locale: ru,
    });

    const { dates } = useSelector(selectDateData);

    const getDates = async () => {
        dispatch(
            fetchDates(),
        );
    };

    useEffect(() => {
        getDates();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const months = Array.from(new Array(Math.floor(365 / 7)));

    const data = Array.from(new Array(365)).map((_, index) => {
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
                    Пн Ср Пт
                </div>

                <div className={styles.cells}>
                    {data.map((item, index) => (
                        <Cell key={index} date={item.date} contributionsCount={item.value} />
                    ))}
                </div>
            </div>

        </div>
    );
});
