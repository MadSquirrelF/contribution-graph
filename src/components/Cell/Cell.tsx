import { memo } from 'react';
import styles from './Cell.module.scss';
import { classNames } from '../../lib/classNames/classNames';

interface CellProps {
  className?: string;
  contributionsCount?: number;
  date?: string;
}

export const Cell = memo(({ className, contributionsCount, date }: CellProps) => (
    <div className={classNames(styles.Cell, {}, [className])} />
));
