/* eslint-disable react/no-array-index-key */
import { memo } from 'react';

import { classNames } from '../../lib/classNames/classNames';
import styles from './Graph.module.scss';
import { Cell } from '../Cell/Cell';

interface GraphProps {
  className?: string;
  range?: any[];
  data?: any[]
}

export const Graph = memo(({ className, range, data }: GraphProps) => {
    const cells = Array.from(new Array(357));

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
                        <Cell key={index} contributionsCount={index} />
                    ))}
                </div>
            </div>

        </div>
    );
});
