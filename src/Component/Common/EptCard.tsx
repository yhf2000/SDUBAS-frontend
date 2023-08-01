import {useState} from "react";
import {Card, Col, Divider, Row} from "antd";
import Meta from "antd/es/card/Meta";

export default function EptCard({item,onClick}:any){
    const [isHovered,setIsHovered] = useState(false);
    return (
            <Card
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
                style={{  transform: isHovered ? 'translateY(-6px)' : 'none',
                    transition: 'transform 0.2s ease',cursor: 'pointer'}}
                onClick={onClick}
            >
                <Row gutter={16}>
                    <Col span={4}>
                        <img src={item.proImage} alt="Item Image" style={{width: '100%', height: 'auto'}}/>
                    </Col>
                    <Col span={16}>
                        <Meta
                            title={<div
                                style={{fontWeight: 'bold', textAlign: 'center'}}>{item.title}</div>}
                            description={
                                <div style={{
                                    display: 'flex',
                                    gap: '200px',
                                    marginLeft: '300px',
                                    marginTop: '50px'
                                }}>
                                    <div>学分:{item.credit}</div>
                                    <div>日期:{item.date}</div>
                                </div>
                            }
                        />
                    </Col>
                    <Col>
                        <div style={{textAlign: 'center'}}>成绩: {item.score}</div>
                        <Divider type={'horizontal'}/>
                        <div style={{textAlign: 'center'}}>
                            个人进度: {item.progress} / {item.totalProjects}
                        </div>
                    </Col>
                </Row>
            </Card>
    )
}