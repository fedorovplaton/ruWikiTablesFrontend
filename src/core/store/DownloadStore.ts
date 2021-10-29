import {Status} from '../types/Status';

export class DownloadStore {
    private readonly getStatus: () => Promise<Status>;
    private intervalId: number | undefined;
    private intervalPeriod = 3000;

    private lastCountDone: number | undefined;
    private countDone: number = 0;
    private timeDone: number = 0;

    constructor(
        getStatus: () => Promise<Status>
    ) {
        this.getStatus = getStatus;
    }

    public subscribe = (callback?: (status: Status) => void) => {
        this.intervalId = window.setInterval(() => {
            this.status().then((status) => {
                if (callback) {
                    callback(status);
                }
            });
        }, this.intervalPeriod);
    }

    public unsubscribe = () => {
        if (this.intervalId) {
            clearInterval(this.intervalId);
        }

        this.countDone = 0;
        this.timeDone = 0;
        this.lastCountDone = undefined;
    }

    public status = (): Promise<Status> => {
        return this.getStatus().then((status) => {
            if (status.approximateTime === undefined) {
                if (this.lastCountDone === undefined) {
                    this.lastCountDone = status.downloadedCount;
                } else {
                    this.countDone = status.downloadedCount - this.lastCountDone;
                    this.timeDone += this.intervalPeriod / 1000;

                    const speed = this.countDone / this.timeDone;

                    console.info(speed);

                    status.approximateTime = (status.totalCount - status.downloadedCount) / speed;
                }
            }

            return status;
        });
    }
}
