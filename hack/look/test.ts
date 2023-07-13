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
look.seek('task').seek('name')
look.seek('foo')
look.seek('bar')

fill.hold(site)

console.log('after hold')
const formList = new BindList()
site.save('form', formList)
const taskList = new BindList()
site.save('task', taskList)
console.log('after save formList')
site.save('foo', new BindSink(true))
console.log('after save foo')
site.save('bar', new BindSink(true))
console.log('after save bar')

const form = new BindSite()
form.save('name', new BindSink('user'))
formList.saveHead(form)

const form2 = new BindSite()
form2.save('name', new BindSink('post'))
formList.saveHead(form2)
// formList.seal()

const task = new BindSite()

task.save('name', new BindSink('create'))
taskList.saveHead(task)
taskList.seal()

console.log('after save name')
