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
var QuizModel = require('../models/QuizModel');
var QuestionModel = require('../models/QuestionModel');
var StudentAnswerModel = require('../models/StudentAnswerModel');

module.exports = React.createClass({
	getInitialState: function() {
		return {
			numberOfQuestions: null,
			allQuizzes: [],
			allQuestionAverages: [],
			currentType: null
		};
	},
	componentWillMount: function() {

		// pull all quizzes
		var quizQuery = new Parse.Query(QuizModel);
		quizQuery.find().then(
			(quiz) => {
				this.setState({allQuizzes: quiz});
				console.log(this.state.allQuizzes);
			},
			(err) => {
				console.log(err);
			}
		);


		var id = 'aXsQUrXeTB';

		this.query = new Parse.Query(QuizModel);
		// this.query.equalTo('objectId', id)
		this.query.get(id).then(
			(targetQuiz) => {
				// this.setState({allQuizzes: totalQuestions});
				console.log(targetQuiz);
			}
		);

		console.log('test');
		var query2 = new Parse.Query(QuestionModel);
		var that = this;
		query2.equalTo('quizId', new QuizModel({objectId: id}));
		query2.count().then(function(number) {
			that.setState({numberOfQuestions: number});
			console.log(that.state.numberOfQuestions);
		});

		// make an array of all questions that match a certain quiz
		// this.query = new Parse.Query(QuestionModel);
		// this.query
		// .find.then({

		// });


		// make an array of all studentCorrect answers from the previously formed array of questions

		// var innerQuery = Parse.Query(StudentAnswerModel);
		// this.innerQuery.matchesQuery('studentCorrect', query);
		// console.log(innerQuery);

		// questionQuery
		// .find()
		// .equalTo('quizId')
		// .then(
		// 	(quiz) => {
		// 		this.setState({ allQuizzes: quiz });
		// 	},
		// 	(err) => {
		// 		console.log(err);
		// 	}
		// );

		// studentAnswerQuery
		// .find()
		// .equalTo('studentCorrect')
		// .then(
		// 	(average) => {
		// 		this.setState({ });
		// 	},
		// 	(err) => {
		// 		console.log(err);
		// 	}
		// );


		// var correctAnswers = 0;

		// for(var i = 0; i < studentCorrect.length; i++) {
		// 	if(studentCorrect === true) {
		// 		correctAnswers += 1;
		// 	}
		// }

	},
	render: function(){

		var that = this;
		var leftContent = this.state.allQuizzes.map(function(quiz) {
			return (
				<option value={that.objectId} ref={that.quizTitle}>{quiz.get('quizTitle')}</option>
			);
		});

// {quiz.get('quizTitle')} - {quiz.get('totalQuestions')}

		var rightContent = ('paul revere');


		return (
			<div className="class-anaylitcs-container">
				<div className="left-side">
					<select onClick={this.onQuizSelected}>
						<option disabled>Quizzes</option>
						{leftContent}
					</select>
				</div>

				<div className="right-side">
					<div>{rightContent}</div>
				</div>
			</div>
		)
	},
	onQuizSelected: function() {
		console.log('button was clicked!');
		// console.log(this.refs.quizTitle);
		this.setState({
			currentType: this.objectId
		});
	}
});