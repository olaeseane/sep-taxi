import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { Redirect } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import {
  authRegistrationRequest,
  authAuthorizationRequest,
  getIsAuthorized,
  authSetToken
} from '../../modules/Auth/';
import { load } from '../../modules/utils/localstorage';

export const styles = theme => ({
  root: {
    ...theme.mixins.gutters(),
    paddingTop: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit * 2,
    width: 400
  },
  selected: {
    color: '#999'
  },
  input: {
    width: '100%'
  },
  button: {
    marginTop: theme.spacing.unit * 2,
    textTransform: 'uppercase'
  }
});

export class Login extends PureComponent {
  state = {
    signup: true,
    inputEmail: '',
    inputPassword: ''
  };

  componentDidMount() {
    const { authSetToken } = this.props;
    const token = load();
    if (token !== null) authSetToken(token);
  }

  handleCaptionClick = e => {
    e.preventDefault();
    this.setState(state => ({ signup: !state.signup }));
  };

  handleBtnClick = e => {
    const { inputEmail, inputPassword } = this.state;
    const { authRegistrationRequest, authAuthorizationRequest } = this.props;
    const { signup } = this.state;
    if (signup)
      authRegistrationRequest({ email: inputEmail, password: inputPassword });
    else {
      authAuthorizationRequest({ email: inputEmail, password: inputPassword });
    }
  };

  handleEmailChange = e => {
    this.setState({ inputEmail: e.target.value });
  };

  handlePasswordChange = e => {
    this.setState({ inputPassword: e.target.value });
  };

  render() {
    const { isAuthorized, classes } = this.props;
    const { signup, inputEmail, inputPassword } = this.state;

    if (isAuthorized) return <Redirect to="/profile" />;

    return (
      <Paper className={classes.root}>
        <Typography
          onClick={this.handleCaptionClick}
          variant="h5"
          align="center"
        >
          {signup ? (
            <span>Авторизация</span>
          ) : (
            <span className={classes.selected}>Авторизация</span>
          )}{' '}
          /{' '}
          {signup ? (
            <span className={classes.selected}>Регистрация</span>
          ) : (
            <span>Регистрация</span>
          )}
        </Typography>
        <TextField
          name="email"
          value={inputEmail}
          onChange={this.handleEmailChange}
          fullWidth={true}
          label="Почта"
          margin="dense"
        />
        <TextField
          name="password"
          value={inputPassword}
          onChange={this.handlePasswordChange}
          fullWidth={true}
          label="Пароль"
          margin="dense"
        />
        <Button
          onClick={this.handleBtnClick}
          fullWidth={true}
          variant="contained"
          color="primary"
          className={classes.button}
        >
          {signup ? 'Регистрация' : 'Войти'}
        </Button>
      </Paper>
    );
  }
}

const WithStylesLogin = withStyles(styles)(Login);

export default connect(
  state => ({
    isAuthorized: getIsAuthorized(state)
  }),
  { authRegistrationRequest, authAuthorizationRequest, authSetToken }
)(WithStylesLogin);
