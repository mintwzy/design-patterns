interface IIterator<T> {
  first(): void
  next(): void
  isDone(): boolean
  currentItem(): T
}

interface IAbstractList<T> {
  createIterator(): IIterator<T>
}

abstract class AbstractList<T> implements IAbstractList<T> {
  abstract createIterator(): IIterator<T>;
}

class List<T> extends AbstractList<T>{
  data: T[]

  constructor() {
    super();
    this.data = Array()
  }

  createIterator(): IIterator<T> {
    return new ListIterator<T>(this)
  }

  count(): number {
    return this.data.length;
  }

  get(index: number): T {
    return this.data[index]
  }

  add(d: T) {
    this.data.push(d)
  }
}

class ListIterator<T> implements IIterator<T> {
  _list: List<T>
  _current: number

  constructor(aList: List<T>) {
    this._list = aList
    this._current = 0
  }

  /**
   * First positions the iterator to the first element:
   */
  first(): void{
    this._current = 0
  }

  next(): void {
    this._current++
  }

  isDone(): boolean {
    return this._current >= this._list.count()
  }

  currentItem(): T {
    if(this.isDone()) {
      throw Error('Iterator out of bound')
    }

    return this._list.get(this._current)
  }

}

class ReverseListIterator<T> implements IIterator<T> {
  _list: List<T>
  _current: number

  constructor(aList: List<T>) {
    this._list = aList
    this._current = 0
  }

  /**
   * First positions the iterator to the first element:
   */
  first(): void{
    this._current = this._list.count() - 1
  }

  next(): void {
    this._current--
  }

  isDone(): boolean {
    return this._current < 0
  }

  currentItem(): T {
    if(this.isDone()) {
      throw Error('Iterator out of bound')
    }

    return this._list.get(this._current)
  }

}

class Employee {
  name: string

  constructor(name: string) {
    this.name = name;
  }

  print() {
    console.log(`Employee name: ${this.name}`)
  }
}

const printEmployees = (iterator: IIterator<Employee>) => {
  for(iterator.first(); !iterator.isDone(); iterator.next()) {
    iterator.currentItem().print()
  }
}

console.log('---1. demo forward & reverse')
const employees: List<Employee> = new List<Employee>();
employees.add(new Employee('employee 1'))
employees.add(new Employee('employee 2'))
const forwardIterator: ListIterator<Employee> = new ListIterator<Employee>(employees)
const backwardIterator: ReverseListIterator<Employee> = new ReverseListIterator<Employee>(employees)
console.log('-------------')
printEmployees(backwardIterator)

