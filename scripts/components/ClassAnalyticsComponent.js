/*
 *	Class Analytics Component
 *
 *	requires:
 *		Quiz Model
 *			quizTitle: string
 *			totalQuestions: number
 *
 *		QuestionModel
 * 			quizId: pointer
 *			objectId
 *
 * 		StudentAnswerModel
 *			studentCorrect: boolean
 *
 */

var React = require('react');
var ReactDOM = require('react-dom');
var _ = require('backbone/node_modules/underscore');
var QuizModel = require('../models/QuizModel');
var QuestionModel = require('../models/QuestionModel');
var StudentAnswerModel = require('../models/StudentAnswerModel');

module.exports = React.createClass({
	getInitialState: function() {
		return {
			numberOfQuestions: null,
			answerThenQuestion: null,
			allAnswerList: null,
			currentType: null,
			correctAnswers: null,
			allQuizzes: []
		};
	},
	componentWillMount: function() {
		// pull all quizzes
		var quizQuery = new Parse.Query(QuizModel);
		quizQuery.find().then(
			(quiz) => {
				this.setState({allQuizzes: quiz});
			},
			(err) => {
				console.log(err);
			}
		);

		// this.query = new Parse.Query(QuizModel);
		// this.query.get(id).then(
		// 	(targetQuiz) => {
		// 		console.log(targetQuiz);
		// 	}
		// );

		// var query2 = new Parse.Query(QuestionModel);
		// var that = this;
		// query2.equalTo('quizId', new QuizModel({objectId: id}));
		// query2.count().then(function(number) {
		// 	that.setState({numberOfQuestions: number});
		// });

		// // make an array of all questions that match a certain quiz
		// this.query = new Parse.Query(QuestionModel);
		// this.query
		// .find.then({

		// });

		// // make an array of all studentCorrect answers from the previously formed array of questions
		// var innerQuery = Parse.Query(StudentAnswerModel);
		// innerQuery.matchesQuery('studentCorrect', query);
		// console.log(innerQuery);

		// for(var i = 0; i < studentCorrect.length; i++) {
		// 	if(studentCorrect === true) {
		// 		correctAnswers += 1;
		// 	}
		// }

	},
	render: function() {
		var rightContent = null;

		var leftContent = this.state.allQuizzes.map(function(quiz) {
			return (
				<option key={quiz.id} value={quiz.id}>{quiz.get('quizTitle')}</option>
			);
		});

		// if(this.state.allAnswerList) {
		// 	console.log('answers appeared');
		// 	rightContent = {answerThenQuestion};
		// }
		// else {
		// 	rightContent = (
		// 		<div>Please select a quiz to see data related to that query</div>
		// 	);
		// }

		// ('Questions from selected quiz go here');
		return (
			<div className="class-analytics-container">
				<div className="left-side">
					<h1>Class Analytics</h1>
					<form onSubmit={this.onQuizSelected}>
						<label htmlFor="quizList">Choose Quiz</label>
						<select ref="thisQuiz" id="quizList">
							{leftContent}
						</select>
						<button>Select</button>
					</form>
				</div>

				<div className="right-side">
					<div>{rightContent}</div>
				</div>
			</div>
		);
	},
	onQuizSelected: function(e) {
		e.preventDefault();
		console.log(this.refs.thisQuiz.value);

		this.setState({
			currentType: this.objectId
		});

		var quizId = this.refs.thisQuiz.id;
		console.log(quizId);

		var answerQuery = new Parse.Query(StudentAnswerModel);
		var innerQuestionQuery = new Parse.Query(QuestionModel);

		innerQuestionQuery.equalTo('quizId', new QuizModel({objectId: this.refs.thisQuiz.value}));
		answerQuery.matchesQuery('questionId', innerQuestionQuery).find().then(
			(studentAnswers) => {
				var answerList = _.groupBy(studentAnswers, function(answer) {
					return answer.get('questionId').id;
				});
				this.setState({allAnswerList: answerList});
				// for(var i = 0; i < allAnswerList.length; i++) {
				// 	answerThenQuestion.push(<div>{answerList[i]}</div>);
				// }
			},
			(err) => {
				console.log(err);
			}
		);
	}
});
