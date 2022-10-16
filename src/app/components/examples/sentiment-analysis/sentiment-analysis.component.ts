import { Component, OnInit } from '@angular/core';
import { catchError, finalize } from 'rxjs/operators';
import { AuthService } from 'src/app/services/auth.service';
import { MlModelsService } from 'src/app/services/ml-models.service';
import { TwitterService } from 'src/app/services/twitter.service';

@Component({
    selector: 'app-sentiment-analysis',
    templateUrl: './sentiment-analysis.component.html',
    styleUrls: ['./sentiment-analysis.component.scss'],
})
export class SentimentAnalysisComponent implements OnInit {
    tweet: string = '';
    predictionData: any = null;
    predictionResponse: any = null;
    predictionRequest: any = null;
    apiEndpoint: string = `${window.location.origin}/api/v0/predict/sentiment-analysis`;
    isLoggedIn: boolean = false;
    sentiment: any = {
        label: '',
        score: '',
        score_percentage: '',
    };
    loading: any = {
        tweet: false,
        prediction: false,
    };
    error: any = {
        prediction: '',
    };

    constructor(
        private twitterService: TwitterService,
        private modelService: MlModelsService,
        private authService: AuthService
    ) {}

    ngOnInit(): void {
        this.checkifIsLoggedIn();
        this.getRandomTweet();
    }

    /**
     * Checks login state. If user is logged in, isLoggedIn is set to true
     */
    checkifIsLoggedIn(): void {
        this.isLoggedIn = this.authService.isLoggedIn();
    }

    /**
     * Initializes predictionResponse & sentiment
     */
    initPredictionData(): void {
        this.predictionResponse = null;
        this.sentiment = {
            label: '',
            score: '',
            score_percentage: '',
        };
    }

    /**
     * Gets random tweet from Twitter API
     */
    getRandomTweet(): void {
        this.loading.tweet = true;
        this.initPredictionData();

        this.twitterService
            .getRandomTweet()
            .pipe(finalize(() => (this.loading.tweet = false)))
            .pipe(
                catchError(() => {
                    return [];
                })
            )
            .subscribe((response: any) => {
                this.tweet = response;
                this.predictionData = {
                    columns: ['text'],
                    data: [[this.tweet]],
                };
                this.predictionRequest = JSON.stringify(this.predictionData, null, 4);
            });
    }

    /**
     * Makes prediction request to model and sets predictionResponse with response data
     */
    makePrediction(): void {
        this.loading.prediction = true;
        this.error.prediction = '';
        this.initPredictionData();

        this.modelService
            .makePrediction('sentiment-analysis', this.predictionData)
            .pipe(finalize(() => (this.loading.prediction = false)))
            .pipe(
                catchError((error: any) => {
                    this.predictionResponse = JSON.stringify(error.error, null, 4);
                    this.error.prediction =
                        error.error.data.error === 'forbidden'
                            ? error.error.message
                            : 'An error occurred while making the prediction';

                    return [];
                })
            )
            .subscribe((response: any) => {
                const jsonResponse: any = JSON.parse(response.data.results)[0];

                this.predictionResponse = JSON.stringify(response, null, 4);
                this.sentiment = {
                    label: `${jsonResponse.label}`.toLowerCase(),
                    score: +jsonResponse.score,
                };
            });
    }
}
