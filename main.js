var app = new Vue({
	el: '#app',
	data: {
		api: 'https://raw.githubusercontent.com/hexschool/js-training-task/master/api/BigFive.json',
		name: {},
		description: '',
		traits: {},
		degree: {},
		questionList: [],
		questionDescrition: [],
		pageNum: 0,
		totalScore: 0,
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

				// 把五個方面屬性問題存放在 problemList
				this.traits.en.forEach((sort) => {
					this.questionDescrition.push(res.data.problemList[sort].description);
					res.data.problemList[sort].problems.forEach((problem) => {
						this.questionList.push({
							category: problem.category,
							id: problem.id,
							options: problem.options,
							problem: problem.problem,
						})
					});
				})
			})
		}
	},
	created() {
		this.getApi();
	},
})
