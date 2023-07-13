import Look from './index.js'
import Fill from './fill.js'
import BindSite from './bind/site.js'
import BindList from './bind/list.js'
import BindSink from './bind/sink.js'

const look = new Look()
const fill = new Fill({ look, name: 'asdf' })

fill.on('take', () => {
  console.log('resolved')
})

const site = new BindSite()

look.seek('form').seek('name')
look.seek('form').seek('link').seek('href')
// look.seek('task').seek('name')
look.seek('foo')
look.seek('bar')

fill.hold(site)

// console.log('start')
// console.log('after hold')
const formList = new BindList()
site.save('form', formList)
const taskList = new BindList()
site.save('task', taskList)
console.log('after save formList')
site.save('foo', new BindSink(true))
// console.log('after save foo')
site.save('bar', new BindSink(true))
// console.log('after save bar')

const form = new BindSite()
form.save('name', new BindSink('user'))
const linkList = new BindList()
form.save('link', linkList)
formList.saveHead(form)

const link = new BindSite()
linkList.saveHead(link)
link.save('href', new BindSink('email'))
linkList.seal()

const form2 = new BindSite()
form2.save('name', new BindSink('post'))
formList.saveHead(form2)
formList.seal()

// const task = new BindSite()

// console.log('here')
// task.save('name', new BindSink('create'))
// taskList.saveHead(task)
// taskList.seal()

// console.log('after save name')
