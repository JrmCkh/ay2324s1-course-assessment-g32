import axios from 'axios';

const rootUrl = 'http://localhost:3000/question';

const config = {
  headers: {
    'Content-Type': 'application/json'
  }
};

export const createQuestion = (title, complexity, description, tags) => {
  const questionData = {
    title: title,
    complexity: complexity,
    description: description,
    tags: tags
  };
  return axios.post(rootUrl + "/create", questionData, config);
};

export const getQuestions = async () => {
  const response = await axios.get(rootUrl + "/getAll");
  return response.data.questions;
};

export const getQuestionDetails = async (questionId) => {
  const questionDetails = await axios.get(rootUrl + "/getQuestionDetails", {
    params: {
      id: questionId
    }
  });
  return questionDetails.data.question;
};

export const editQuestion = (id, title, complexity, description, tags) => {
  const questionData = {
    id: id,
    title: title,
    complexity: complexity,
    description: description,
    tags: tags
  };
  return axios.post(rootUrl + '/edit', questionData, config);
};

export const deleteQuestion = (id) => {
  return axios.delete(rootUrl + '/delete', {
    params: {
      id: id
    }
  });
};
