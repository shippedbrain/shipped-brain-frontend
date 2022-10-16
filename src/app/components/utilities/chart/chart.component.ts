import { AfterViewInit, Component, Input } from '@angular/core';
import Chart from 'chart.js';

@Component({
    selector: 'app-chart',
    templateUrl: './chart.component.html',
    styleUrls: ['./chart.component.scss'],
})
export class ChartComponent implements AfterViewInit {
    @Input() chartID: string;
    @Input() title: string;
    @Input() labels: any[];
    @Input() values: any[];

    constructor() {}

    ngAfterViewInit(): void {
        if (this.chartID && this.labels && this.values) {
            this.buildChart();
        }
    }

    /**
     * Buils doughnut chart from input values
     */
    buildChart(): void {
        const ctx = (document.getElementById(this.chartID) as HTMLCanvasElement).getContext(
            '2d'
        );
        new Chart(ctx, {
            type: 'doughnut',
            data: {
                datasets: [
                    {
                        data: this.values,
                        backgroundColor: [
                            'rgba(255, 99, 132, 0.8)',
                            'rgba(54, 162, 235, 0.8)',
                            'rgba(255, 206, 86, 0.8)',
                            'rgba(75, 192, 192, 0.8)',
                            'rgba(153, 102, 255, 0.8)',
                            'rgba(255, 159, 64, 0.8)',
                        ],
                    },
                ],
                labels: this.labels,
            },
            options: {
                title: {
                    display: true,
                    text: this.title,
                },
                responsive: false,
            },
        });
    }
}
