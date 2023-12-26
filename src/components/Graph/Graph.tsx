/* eslint-disable react/no-array-index-key */
import { memo, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { classNames } from '../../lib/classNames/classNames';
import styles from './Graph.module.scss';
import { Cell } from '../Cell/Cell';
import { useAppDispatch } from '../../Redux/store';
import { fetchDates } from '../../Redux/date/asyncActions';
import { selectDateData } from '../../Redux/date/selectors';

interface GraphProps {
  className?: string;
}

export const Graph = memo(({ className }: GraphProps) => {
    const cells = Array.from(new Array(3));
    const dispatch = useAppDispatch();

    const { dates, status } = useSelector(selectDateData);

    const getDates = async () => {
        dispatch(
            fetchDates(),
        );
    };

    getDates();

    return (
        <div className={classNames(styles.Graph, {}, [className])}>

            <div className={styles.months}>
                Окт Ноя Дек
            </div>

            <div className={styles.container}>
                <div className={styles.weekdays}>
                    Пн Ср Пт
                </div>

                <div className={styles.cells}>
                    {cells.map((_item, index) => (
                        <Cell key={index} />
                    ))}
                </div>
            </div>

        </div>
    );
});
