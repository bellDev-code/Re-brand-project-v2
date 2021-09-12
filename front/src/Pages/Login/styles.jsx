import styled from '@emotion/styled';

export const Container = styled.section`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100vh;
`;

export const AccountForm = styled.div`
  box-shadow: 0px 0px 7px 5px rgb(0 0 0 / 4%);
  padding: 30px 40px;
  background: #fff;
  width: 50%;
  & > h3 {
    margin: 0;
    font-size: 24px;
    font-weight: 500;
    text-align: center;
  }
`;

export const LoginForm = styled.form`
  display: flex;
  flex-direction: column;
`;

export const ButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
`;

export const LinkWrapper = styled.div`
  display: flex;
  padding-top: 20px;
  justify-content: center;
  text-align: center;
  align-items: center;

  a:link {
    text-decoration: none;
    padding: 5px;
  }

  a:visited {
    color: #000;
  }

  a:hover {
    color: #ddd;
  }
`;

export const LoginBtn = styled.button`
  cursor: pointer;
  background-color: #000;
  color: #fff;
  font-size: 12px;
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 2px;
  border: 0;
  padding: 16px 35px;
`;
