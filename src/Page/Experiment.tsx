import tableWithPagination from "../Component/Common/Table/TableWithPagination";
import TableWithPagination from "../Component/Common/Table/TableWithPagination";
import {Api} from "../API/api";
import {useTranslation} from "react-i18next";
import {Avatar, Card, Col, Divider, Form, Image, Input, List, Row, Select, Space, Typography} from "antd";
import Title from "antd/es/typography/Title";
import Meta from "antd/es/card/Meta";
import {useState} from "react";
import EptCard from "../Component/Common/EptCard";
import {useNavigate} from "react-router-dom";

const Experiment = () => {
    const {t} = useTranslation();
    const navigate = useNavigate();
    function handleClick(){
        navigate('/c/project-info');
    }
    return (
        <>
            <TableWithPagination
                useList={true}
                API={Api.getCreditBank}
                title={t("Experiment")}
                size={'small'}
                getForm={(onFinish: any) => {
                    return (
                        <Space size={30}>
                            <Form.Item label={t("Search")} name={"title"}>
                                <Input onPressEnter={() => {
                                    onFinish()
                                }}/>
                            </Form.Item>
                        </Space>
                    );
                }}
                useFormBtn={false}
                defaultPageSize={12}
                renderItem={(item: any) => {
                    return (
                        <List.Item key={item.name}>
                            <EptCard item={item} onClick={()=>handleClick()}/>
                        </List.Item>
                    )
                }}
            />
        </>
    );
}

export default Experiment;