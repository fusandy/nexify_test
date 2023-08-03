import React, { useCallback } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { setDataList } from './actions'

import { useTranslation } from 'react-i18next'
import moment from 'moment'

import { Card, Row, Button, Table, Input, DatePicker, Slider, notification } from 'antd'

const Main = () => {
  const { t } = useTranslation()
  const dispatch = useDispatch()

  const dataList = useSelector(state => state.dataList)

  const getData = useCallback(async () => {
    try {
      const response = await fetch('http://nexifytw.mynetgear.com:45000/api/Record/GetRecords')
      const data = await response.json() || {}
      const dataList = data.Data || []

      dispatch(setDataList(dataList))
    } catch (err) {
      console.warn(err)
    }
  }, [])

  const postData = useCallback(async (dataList) => {
    try {
      await fetch('http://nexifytw.mynetgear.com:45000/api/Record/SaveRecords', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify(dataList)
      })

      await getData()

      notification.success({ message: t('successful') })
    } catch (err) {
      console.warn(err)
      notification.error({ message: t('failed') })
    }
  }, [])

  return (
    <Card>
      <Row gutter={24} style={{ margin: '0 0 10px 0', justifyContent: 'space-between' }}>
        <Button
          type='primary'
          onClick={() => {
            dataList.unshift({})
            dispatch(setDataList(dataList))
          }}
        >{t('add')}</Button>
        <Button 
          type='primary'
          style={{ backgroundColor: '#52c41a'}}
          onClick={() => postData(dataList)}
        >{t('save')}</Button>
        <Button
          type='primary'
          danger
          onClick={getData}
        >{t('update')}</Button>
      </Row>
      <Table
        size='small'
        rowKey={record => dataList.indexOf(record)}
        dataSource={dataList}
        pagination={false}
      >
        <Table.Column
          align='center'
          dataIndex='Name'
          render={(value, record, index) => (
            <a
              onClick={() => {
                dataList.splice(index, 1)
                dispatch(setDataList(dataList))
              }}
            >{t('delete')}</a>
          )}
        />
        <Table.Column
          align='center'
          title={t('name')}
          dataIndex='Name'
          render={(value, _, index) => (
            <Input 
              value={value}
              onChange={e => {
                dataList[index].Name = e.target.value
                dispatch(setDataList(dataList))
              }}
            />
          )}
        />
        <Table.Column
          align='center'
          title={t('birthday')}
          dataIndex='DateOfBirth'
          render={(value, _, index) => (
            <DatePicker
              showToday='false'
              format='YYYY-MM-DD'
              name='DateOfBirth'
              value={value ? moment(value) : null}
              onChange={(_, dateString) => {
                dataList[index].DateOfBirth = dateString
                dispatch(setDataList(dataList))
              }}
            />
          )}
        />
        <Table.Column
          width={200}
          align='center'
          title={t('salary')}
          dataIndex='Salary'
          render={(value, _, index) => (
            <Slider
              max={100000}
              min={0}
              value={value}
              onChange={salary => {
                dataList[index].Salary = salary
                dispatch(setDataList(dataList))
              }}
            />
          )}
        />
        <Table.Column
          align='center'
          title={t('address')}
          dataIndex='Address'
          render={(value, _, index) => (
            <Input
              value={value}
              onChange={e => {
                dataList[index].Address = e.target.value
                dispatch(setDataList(dataList))
              }}
            />
          )}
        />
      </Table>
    </Card>
  )
}

export default Main
