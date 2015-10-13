/*
 *
 *
 *
 *
 */

var React = require('react');
var QuestionModel = require('../models/QuestionModel');
var StudentAnswerModel = require('../models/StudentAnswerModel');

module.exports = React.createClass({
	getInitialState: function() {
		return {
			allQuizzes: [],
			allQuestionAverages: []
		};
	},
	componentWillMount: function() {
		// make an array of all questions that match a certain quiz
		var query = new Parse.Query(QuestionModel);
		this.query.equalTo('quizId', id);

		// make an array of all studentCorrect answers from the previously formed array of questions
		var innerQuery = Parse.Query(StudentAnswerModel);
		this.innerQuery.matchesQuery('studentCorrect', query);

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

	},
	render: function(){

		return (
			<div className="class-anaylitcs-container">

			</div>
		)
	}
});
