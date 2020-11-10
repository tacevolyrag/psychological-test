var app = new Vue({
	el: '#app',
	data: {
		api: 'https://raw.githubusercontent.com/hexschool/js-training-task/master/api/BigFive.json',
		name: {},
		description: '',
		traits: {},
		degree: {},
		questionList: [],
		fiveFeatureScore: {},
		pageNum: 0,
		result: 0,
		isActive: false,
	},
	methods: {
		getApi() {
			axios.get(this.api)
				.then((res) => {
					console.log(res.data)
					this.name = res.data.name;
					this.description = res.data.description;
					this.traits = res.data.traits;
					this.degree = res.data.degree;
					this.traits.en.forEach((sort) => {
						// 題目存放在 problemList
						res.data.problemList[sort].problems.forEach((problem) => {
							this.questionList.push({
								category: problem.category,
								id: problem.id,
								options: problem.options,
								problem: problem.problem,
							})
						});
						// 五個方面屬性分數特徵放在物件
						this.fiveFeatureScore[sort] = {
							namezh: res.data.problemList[sort].name,
							nameen: sort,
							description: res.data.problemList[sort].description.desc,
							high: res.data.problemList[sort].description.high,
							low: res.data.problemList[sort].description.low,
							middle: res.data.problemList[sort].description.middle,
							score: 0,
						};
					})
				})
		},
		toNextPage(score) {
			if (score === undefined || score === 0) {
				console.log(document.body.clientWidth);
				if(document.body.clientWidth > 767) {
					$('.nextQuestion').popover('show');
				} else {
					alert('請輸入適合你的選項唷！');
				};
			} else {
				this.pageNum += 1;
				if (this.pageNum > 10) {
					this.resultScore();
				}
			}
		},
		resultScore() {
			this.traits.en.forEach((feature, idx) => {
				this.questionList.forEach(question => {
					if (feature === question.category) {
						this.fiveFeatureScore[feature].score += question.score;
					}
				})
			});
		},
		reset() {
			if (this.result === this.traits.en.length - 1) {
				const restart = confirm("確定要重新測試嗎？");
				if (restart) {
					this.pageNum = 0;
					this.result = 0;
					this.questionList.forEach(question => {
						question.score = 0;
					})
					Object.keys(this.fiveFeatureScore).forEach(feature => {
						this.fiveFeatureScore[feature].score = 0;
					})
				}
			}
		}
	},
	created() {
		this.getApi();
	},
})
