import React from 'react';
import zxcvbn from 'zxcvbn';

// Progress meter for checking strength of password
class CustomPassword extends React.Component {
    constructor(props) {
        super(props);

        this.createPasswordLabel = this.createPasswordLabel.bind(this);
    }

    createPasswordLabel = (result) => {
        switch (result.score) {
          case 0:
            return 'Weak';
          case 1:
            return 'Weak';
          case 2:
            return 'Fair';
          case 3:
            return 'Good';
          case 4:
            return 'Strong';
          default:
            return 'Weak';
        }
    }

    render() {
        const { password } = this.props;
        const testedPassword = zxcvbn(password);

        return (
            <div className="password-strength-meter">
                <progress
                    className={`password-strength-meter-progress strength-${this.createPasswordLabel(testedPassword)}`}
                    value={testedPassword.score}
                    max="4"
                    />
                <label className="password-strength-meter-label">
                    {password && (
                        <p>
                            <strong>Password strength:</strong> {this.createPasswordLabel(testedPassword)}
                        </p>
                    )}
                </label>
            </div>
        );
    }
}

export default CustomPassword;