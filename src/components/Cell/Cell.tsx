import { memo } from 'react';
import { ru } from 'date-fns/locale/ru';
import { format } from 'date-fns';
import styles from './Cell.module.scss';
import { classNames } from '../../lib/classNames/classNames';

interface CellProps {
  className?: string;
  interval?: string;
  contributionsCount: number;
  date?: string;
}

export const Cell = memo((props: CellProps) => {
    const {
        className, contributionsCount, date, interval,
    } = props;

    const mods: Record<string, boolean> = {
        [styles.empty]: contributionsCount === 0,
        [styles.firstStage]: contributionsCount > 0 && contributionsCount <= 9,
        [styles.secondStage]: contributionsCount > 9 && contributionsCount <= 19,
        [styles.thirdStage]: contributionsCount > 19 && contributionsCount <= 29,
        [styles.finalStage]: contributionsCount > 29,
    };

    if (date) {
        const mods: Record<string, boolean> = {
            [styles.empty]: contributionsCount === 0,
            [styles.firstStage]: contributionsCount > 0 && contributionsCount <= 9,
            [styles.secondStage]: contributionsCount > 9 && contributionsCount <= 19,
            [styles.thirdStage]: contributionsCount > 19 && contributionsCount <= 29,
            [styles.finalStage]: contributionsCount > 29,
        };

        const currentDate = format(date, "EEEE',' dd MMMM', 'yyyy", {
            locale: ru,
        });

        return (
            <div className={styles.Cell}>
                <div className={styles.notification}>
                    {
                        contributionsCount > 0 ? (
                            <span>
                                {contributionsCount}
                                {' '}
                                contributions
                            </span>
                        ) : (<span>No contributions</span>)
                    }

                    <p>{currentDate}</p>
                </div>

                <div className={classNames(styles.box, mods, [className])} />
            </div>
        );
    }

    return (
        <div className={styles.Cell}>
            <div className={styles.notification}>
                {
                    contributionsCount > 0 ? (
                        <span>
                            {interval}
                            {' '}
                            contributions
                        </span>
                    ) : (<span>No contributions</span>)
                }
            </div>

            <div className={classNames(styles.box, mods, [className])} />
        </div>
    );
});
