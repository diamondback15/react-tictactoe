import { Container, Row, Col } from 'reactstrap'

const LabLayout = props => (
    <Container>
      <Row>
        <Col md={{ size: 10 }}>
        {props.children}
        </Col>
      </Row>
      <style jsx global>{`
        body {
          background-color: #214a70;
          font-size: 1rem;
          line-height: 1.8;
          color: #214a70;
        }

        .card {
          border: none;
          background: transparent;
        }

        html {
          font-size: 16px;
        }

        h1 {
          font-size: 3rem;
          margin-top: 3rem;
          margin-bottom: 2rem;
        }

        h2, h3 {
          font-weight: 600;
          color: #214a70;
        }

        h2 {
          font-size: 1.4rem;
        }

        h2, h3 {
          margin-top: 2rem;
        }

        @media screen and (max-width: 575px) {
          html {
            font-size: 14px;
          }

          h1 {
            font-size: 2rem;
            margin-top: 1rem;
            margin-bottom: 1rem;
          }

          .card {
            padding: 1rem;
          }
        }
      `}</style>
    </Container>
)

export default LabLayout
