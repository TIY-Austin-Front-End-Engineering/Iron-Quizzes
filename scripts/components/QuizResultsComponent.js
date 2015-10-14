//The QuizResultsComponent creates the html that dsiplays the users results after having completed a quiz, includong the correct or incorrect answers marked.
//The expected properties are the QuizModel(to identify which quiz to show the results for), the QuestionModel(to identify what each question needs), and the StudentAnswersModel(so the correct answers will be associated with the proper questions)

var React = require('react');
var PossibleAnswersComponent = require('./PossibleAnswersComponent');

var numQuestions = 0;
var numCorrect = 0;


module.exports = React.createClass({
	getInitialState: function () {
		return {
			userId: this.props.userId,
			quizId: this.props.quizId,
			questions: null,
			error: null
		}
	},
	componentWillMount: function () {
		var QuestionModel = Parse.Object.extend('QuestionModel');
		var QuizModel = Parse.Object.extend('QuizModel');
		var StudentAnswerModel = Parse.Object.extend('StudentAnswerModel');
		var UserModel = Parse.User;

		var targetQuizModel = new QuizModel({objectId: this.props.quizId});
		var query = new Parse.Query(QuestionModel);
		query.equalTo('quizId', targetQuizModel)
		query.find().then((results)=> {
			this.setState({
				questions: [results]
			});
		});
		


	},
	render: function() {
		//var questions maps out the questions associated with the quizId
		if(this.state.questions){
			var questions = this.state.questions
			.map((question)=> {
				return (
					<div>
						<h2>{question[0].get('questionTitle')}</h2>
						<h3>{question[0].get('questionContent')}</h3>
					</div>
					);
			})
		
			return (
				<div>
					<div>
						<div>Quiz Name: {this.state.quizId}</div>
						<div>User: {Parse.User.current('username')}</div>
						<div>Percentage: %</div>
					</div>
					<div>
						{questions}
					</div>
				</div>
			);

		}
		
	},
	percent: ()=>{
		//correct answers devided by num questions
		studentAnswersQuery.equalTo('quiz_id', this.state.quiz)
		.equalTo('studentCorrect', true).then({
			success: function (results){
				numCorrect=results.length()
			}
		})
		numQuestions=this.state.questions.length();
		return Math.round(numCorrect/numQuestions*100)
	}
	
});