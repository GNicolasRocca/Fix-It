import styled from "styled-components";

const AboutContainer = styled.section`
    width: 100%;
    min-height: 100%;
    padding: 40px 20px;
    display: flex;
    justify-content: center;
    align-items: flex-start;
    background-color: #f5f5f5;
`;

const AboutCard = styled.div`
    width: 100%;
    max-width: 900px;
    padding: 35px;
    background-color: white;
    border-radius: 12px;
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
`;

const Title = styled.h1`
    margin-bottom: 20px;
    text-align: center;
`;

const Description = styled.p`
    line-height: 1.7;
    margin-bottom: 30px;
    color: #444;
`;

const InfoContainer = styled.div`
    display: flex;
    flex-direction: column;
    gap: 20px;
`;

const InfoSection = styled.div`
    h3 {
        margin: 0 0 8px 0;
    }

    p {
        margin: 0;
        line-height: 1.6;
        color: #555;
    }
`;

export const AboutUs = () => {
    return (
        <AboutContainer>
            <AboutCard>

                <Title>Sobre nosotros</Title>

                <Description>
                    Fix-It es un servicio técnico especializado en reparación y
                    mantenimiento de computadoras. Nuestro objetivo es brindar
                    soluciones rápidas y confiables para que puedas volver a
                    utilizar tus equipos con normalidad.
                    <br />
                    <br />
                    Realizamos diagnóstico, mantenimiento y reparación de
                    computadoras, buscando ofrecer una atención clara y
                    personalizada en cada caso.
                </Description>

                <InfoContainer>

                    <InfoSection>
                        <h3>📍 Dirección</h3>
                        <p>Av. del Libertador 2845, Buenos Aires, Argentina.</p>
                        <p>
                            <small>
                                Dirección ficticia utilizada con fines demostrativos.
                            </small>
                        </p>
                    </InfoSection>

                    <InfoSection>
                        <h3>🕐 Horario de atención</h3>
                        <p>Lunes a viernes de 08:00 a 18:00 hs.</p>
                    </InfoSection>

                    <InfoSection>
                        <h3>💻 Nuestros servicios</h3>
                        <p>
                            Diagnóstico de equipos, reparación de hardware,
                            mantenimiento preventivo, optimización de sistemas y
                            asistencia técnica.
                        </p>
                    </InfoSection>

                </InfoContainer>

            </AboutCard>
        </AboutContainer>
    );
};