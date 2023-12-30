import { memo } from 'react';
import { format, add } from 'date-fns';
import { ru } from 'date-fns/locale/ru';
import clsx from 'clsx';
import { classNames } from '../../lib/classNames/classNames';
import styles from './Month.module.scss';

interface MonthProps {
  startDate: string;
  index: number;
}

export const Month = memo(({ startDate, index }: MonthProps) => {
    const date = format(add(startDate, {
        days: index * 7,
    }), 'yyyy-MM-dd', {
        locale: ru,
    });

    const MonthNameEN = format(date, 'MMM');

    const MonthNameRU = format(date, 'MMM', {
        locale: ru,
    });

    return (
        <div className={classNames(styles.Month, {}, [styles[MonthNameEN]])}>
            {MonthNameRU}
        </div>
    );
});
