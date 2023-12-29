import { memo } from 'react';
import styles from './Month.module.scss';
import { classNames } from '../../lib/classNames/classNames';

interface MonthProps {
  className?: string;
  startDate: number;
  index: number;
}

export const Month = memo(({ className, startDate, index }: MonthProps) => {
    const t = 0;

    return (
        <div className={classNames(styles.Month, {}, [className])}>
            Month
        </div>
    );
});
