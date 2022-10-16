import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import Chart from 'chart.js';
import * as moment from 'moment';
import { catchError, finalize, map } from 'rxjs/operators';
import { Model } from 'src/app/models/model/model';
import { User } from 'src/app/models/user/user';
import { AuthService } from 'src/app/services/auth.service';
import { MlModelsService } from 'src/app/services/ml-models.service';
import { ModelCommentsService } from 'src/app/services/model-comments.service';
import { ModelLikesService } from 'src/app/services/model-likes.service';
import { TabComponent } from '../utilities/tab/tab.component';

@Component({
    selector: 'app-model',
    templateUrl: './model.component.html',
    styleUrls: ['./model.component.scss'],
})
export class ModelComponent implements OnInit {
    modelName: string;
    modelVersion: number = 0;
    model: Model;
    jsonExample: string;
    curlExample: string;
    apiEndpoint: string;
    inputSchema: string;
    outputSchema: string;
    modelEditExample: string;
    predictionResponse: string;
    metrics: string;
    parameters: string;
    inputExample: string;
    signature = {
        inputs: '',
        outputs: '',
    };
    isLoggedInUser: boolean = false;
    currentUser: User = new User();
    modelLikes: number = 0;
    hasLikedModel: boolean = false;
    getComments: boolean = false;
    loading: any = {
        tryModel: false,
    };
    errors = {
        tryModel: '',
    };

    constructor(
        private route: ActivatedRoute,
        private modelsService: MlModelsService,
        private authService: AuthService,
        private modelLikesService: ModelLikesService,
        private modelCommentsService: ModelCommentsService
    ) {}

    ngOnInit(): void {
        this.route.params.subscribe((routeParams) => {
            this.modelName = routeParams.modelname;

            if (this.modelName) {
                this.getModel();
            }
        });
    }

    /**
     * Wrapper for moment
     *
     * @param date Date to format
     * @returns Moment object
     */
    moment(date: any): moment.Moment {
        return moment(date);
    }

    /**
     * Gets model.
     *
     * When successful, methods that get other data from model are called
     */
    getModel(): void {
        this.modelsService.getRegisteredModel(this.modelName).subscribe((response: any) => {
            this.model = response.data.results;

            if (this.model) {
                // TODO: Clean method calls below
                this.getCurrentUser();
                this.setApiEndpoint();
                this.setJSONExample();
                this.setCurlExample();
                this.getModelUsage();
                this.setModelJsonData();
            }
        });
    }

    /**
     * Gets current user's data if logged in
     */
    getCurrentUser(): void {
        if (this.authService.isLoggedIn()) {
            this.authService
                .getCurrentUser()
                .pipe(
                    catchError(() => {
                        return [];
                    })
                )
                .subscribe((response: any) => {
                    this.currentUser = response.data.results;

                    if (this.model && this.currentUser.username === this.model.user.username) {
                        this.isLoggedInUser = true;
                    } else {
                        this.isLoggedInUser = false;
                    }

                    this.getModelLikes();
                });
        } else {
            this.getModelLikes();
        }
    }

    /**
     * Checks if user is logged in by validating username
     *
     * @returns true if username exists, otherwise false
     */
    hasCurrentUser(): boolean {
        return !!this.currentUser.username;
    }

    /**
     * Method is an aggregator for other methods that set model's data, like `metrics`, `parameters`, `input example` and `signature`
     */
    setModelJsonData(): void {
        this.setMetrics();
        this.setParameters();
        this.setInputExample();
        this.setSignature();
    }

    /**
     * Sets model's metrics
     */
    setMetrics(): void {
        if (this.model.metrics) {
            try {
                this.metrics = JSON.stringify(JSON.parse(this.model.metrics), null, 4);
            } catch (error) {
                try {
                    this.metrics = JSON.stringify(this.model.metrics, null, 4);
                } catch (error) {
                    this.metrics = '';
                }
            }
        } else {
            this.metrics = '';
        }
    }

    /**
     * Sets model's parameters
     */
    setParameters(): void {
        if (this.model.parameters) {
            try {
                this.parameters = JSON.stringify(
                    JSON.parse(this.model.parameters as string),
                    null,
                    4
                );
            } catch (error) {
                try {
                    this.parameters = JSON.stringify(this.model.parameters, null, 4);
                } catch (error) {
                    this.parameters = '';
                }
            }
        } else {
            this.parameters = '';
        }
    }

    /**
     * Sets model's input example
     */
    setInputExample(): void {
        if (this.model.input_example) {
            try {
                this.inputExample = JSON.stringify(
                    JSON.parse(this.model.input_example as string),
                    null,
                    4
                );
            } catch (error) {
                try {
                    this.inputExample = JSON.stringify(this.model.input_example, null, 4);
                } catch (error) {
                    this.inputExample = '';
                }
            }
        } else {
            this.inputExample = '';
        }
    }

    /**
     * Sets model's signature
     */
    setSignature(): void {
        if (this.model.signature) {
            let signature: string = '';

            try {
                signature = JSON.stringify(
                    JSON.parse(this.model.signature as string),
                    null,
                    4
                );
                this.signature = {
                    inputs: JSON.stringify(JSON.parse(signature).inputs, null, 4),
                    outputs: JSON.stringify(JSON.parse(signature).outputs, null, 4),
                };
            } catch (error) {
                try {
                    signature = JSON.stringify(this.model.signature, null, 4);
                    this.signature = {
                        inputs: JSON.stringify(JSON.parse(signature).inputs, null, 4),
                        outputs: JSON.stringify(JSON.parse(signature).outputs, null, 4),
                    };
                } catch (error) {
                    this.signature = {
                        inputs: '',
                        outputs: '',
                    };
                }
            }
        } else {
            this.signature = {
                inputs: '',
                outputs: '',
            };
        }
    }

    /**
     * Sets JSON example for a model prediction
     */
    setJSONExample(): void {
        if (this.model.input_example) {
            this.modelEditExample = this.jsonExample = JSON.stringify(
                this.model.input_example,
                null,
                4
            );
        } else {
            this.modelEditExample = 'Unable to load example';
        }
    }

    /**
     * Sets cURL example for model prediction
     */
    setCurlExample(): void {
        if (this.model.input_example) {
            this.curlExample = `curl -X POST ${window.location.origin}/api/v0/predict/${
                this.model.name
            } \n-H 'accept: application/json' \n-H 'Content-Type: application/json' \n-H 'Authorization: Bearer ${this.authService.getUserToken()}' \n-d '`;
        }
    }

    /**
     * Sets `apiEndpoint` for model prediction
     */
    setApiEndpoint(): void {
        this.apiEndpoint = `${window.location.origin}/api/v0/predict/${this.model.name}`;
    }

    /**
     * Gets API call history for model
     */
    getModelUsage(): void {
        this.modelsService
            .getModelUsage(this.model.name, 'D')
            .pipe(
                catchError(() => {
                    return [];
                })
            )
            .subscribe((response: any) => {
                const usage = JSON.parse(response.data.results.sampled_count);

                if (usage) {
                    this.model.usage = [];

                    for (const date of Object.keys(usage)) {
                        this.model.usage.push({
                            date: moment(+date).format('DD-MM-YYYY'),
                            count: usage[date],
                        });
                    }

                    if (this.model.version) {
                        this.setDownloadsChart();
                    }
                }
            });
    }

    /**
     * Gets data and creates API calls' chart
     */
    setDownloadsChart(): void {
        const ctx = (document.getElementById('chartUsage') as HTMLCanvasElement).getContext(
            '2d'
        );
        const dates = [];
        const counts = [];

        this.model.usage.forEach((usage) => {
            dates.push(usage.date);
            counts.push(usage.count);
        });

        new Chart(ctx, {
            type: 'line',
            data: {
                labels: dates,
                datasets: [
                    {
                        label: 'API Calls',
                        data: counts,
                        backgroundColor: [
                            'rgba(255, 99, 132, 0.2)',
                            'rgba(54, 162, 235, 0.2)',
                            'rgba(255, 206, 86, 0.2)',
                            'rgba(75, 192, 192, 0.2)',
                            'rgba(153, 102, 255, 0.2)',
                            'rgba(255, 159, 64, 0.2)',
                        ],
                        borderColor: [
                            'rgba(255, 99, 132, 1)',
                            'rgba(54, 162, 235, 1)',
                            'rgba(255, 206, 86, 1)',
                            'rgba(75, 192, 192, 1)',
                            'rgba(153, 102, 255, 1)',
                            'rgba(255, 159, 64, 1)',
                        ],
                        borderWidth: 1,
                    },
                ],
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                    yAxes: [
                        {
                            ticks: {
                                beginAtZero: true,
                                stepSize: 1,
                            },
                        },
                    ],
                },
            },
        });
    }

    /**
     * Copies element's content to clipboard
     *
     * @param event Element to copy content from
     */
    copyToClipboard(event: any): void {
        const target = document.getElementById(event.target.getAttribute('data-target'));
        const tooltip = document.getElementById(
            event.target.getAttribute('data-target-tooltip')
        );
        const textarea = document.createElement('textarea');

        if (target) {
            textarea.value = `${target[this.getPropertyToCopyByElementType(target)]}`.replace(
                /\n| {4}/gm,
                ''
            );

            document.body.appendChild(textarea);
            textarea.select();
            document.execCommand('copy');
            document.body.removeChild(textarea);

            if (tooltip) {
                tooltip.innerText = 'Copied';

                setTimeout(() => {
                    tooltip.innerText = 'Copy';
                }, 3000);
            }
        }
    }

    /**
     * Clears element's content
     *
     * @param event Element to clear
     */
    clearArea(event: any): void {
        const target = document.getElementById(event.target.getAttribute('data-target'));
        const original = document.getElementById(event.target.getAttribute('data-original'));

        if (target) {
            if (original) {
                target[this.getPropertyToCopyByElementType(target)] = original.innerText;

                // TODO: Find way to abstract ngModel binding
                this.modelEditExample = this.jsonExample;
            } else {
                target.innerText = '';
            }
        }
    }

    /**
     * Checks `element` tag type to determine what property should be used to copy element's content from
     *
     * @param element Element to copy content from
     * @returns `innerHTML` if element is a `textarea`, otherwise `innerText` is returned
     */
    getPropertyToCopyByElementType(element: HTMLElement): string {
        if (element.tagName.toLowerCase() === 'textarea') {
            return 'innerHTML';
        } else {
            return 'innerText';
        }
    }

    /**
     * Makes prediction for model
     */
    tryModel(): void {
        this.loading.tryModel = true;
        this.errors.tryModel = '';

        this.modelsService
            .makePrediction(this.model.name, this.modelEditExample)
            .pipe(finalize(() => (this.loading.tryModel = false)))
            .pipe(
                catchError(() => {
                    this.errors.tryModel = 'An error occurred while making prediction';
                    return [];
                })
            )
            .subscribe((response: any) => {
                // Separate parsing of results array is necessary because API returns a string
                response.data.results = JSON.parse(response.data.results);
                document.getElementById('predictionResponse').innerHTML =
                    this.predictionResponse = JSON.stringify(response, null, 4);
            });
    }

    /**
     * Toggles model like for current user.
     *
     * If user liked model previously, like is removed, otherwise it's added
     */
    toggleLike(): void {
        this.modelLikesService
            .toggleLike(this.model.name)
            .pipe(
                catchError(() => {
                    return [];
                })
            )
            .subscribe(() => {
                this.getModelLikes();
            });
    }

    /**
     * Gets number of model's likes and sets `hasLikedModel` according to response from API
     */
    getModelLikes(): void {
        this.modelLikesService
            .getModelLikes(this.model.name, this.currentUser?.username, true)
            .pipe(
                catchError(() => {
                    return [];
                })
            )
            .subscribe((response: any) => {
                this.modelLikes = response.data.results.likes;
                this.hasLikedModel = response.data.results.has_liked_model;
            });
    }

    /**
     * Method is called when user clicks on a tab.
     * If comments' tab is clicked, getComments is set to true so model-comments component triggers a request to get comments.
     *
     * @param tabClicked Tab clicked by the user
     */
    triggerGetComments(tabClicked: TabComponent): void {
        if (!this.getComments) {
            this.getComments = tabClicked.tabTitle === 'Comments';
        }
    }

    /**
     * Get model's comment count to update number shown in Comments' tab
     */
    getCommentCount(): void {
        this.modelCommentsService
            .getComments(this.model.name, true)
            .pipe(map((response: any) => (this.model.comment_count = response.data.results)))
            .subscribe();
    }
}
