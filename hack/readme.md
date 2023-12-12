## Comments

Comments can be in many ways as `mark`.

    host note-name
      text markdown, <
        Shortens the vector, keeping the first `len` elements and dropping
        the rest.

        If `len` is greater than the vector's current length, this has no
        effect.

        The [`drain`] method can emulate `truncate`, but causes the excess
        elements to be returned instead of dropped.

        Note that this method has no effect on the allocated capacity
        of the vector.

        # Examples

        Truncating a five element vector to two elements:

        ```
        let mut vec = vec![1, 2, 3, 4, 5];
        vec.truncate(2);
        assert_eq!(vec, [1, 2]);
        ```

        No truncation occurs when `len` is greater than the vector's current
        length:

        ```
        let mut vec = vec![1, 2, 3];
        vec.truncate(8);
        assert_eq!(vec, [1, 2, 3]);
        ```

        Truncating when `len == 0` is equivalent to calling the [`clear`]
        method.

        ```
        let mut vec = vec![1, 2, 3];
        vec.truncate(0);
        assert_eq!(vec, []);
        ```
      >

Can do inline `text` format.

    mark
      head 2, <Vector>
      text <Shortens the vector, keeping the first `len` elements and dropping
        the rest.>
        like md

Or even:

    mark md
      <Shortens the vector, keeping the first `len` elements and dropping
        the rest.>

Can mark/flag tasks and such that are:

- deprecated: `mark toss`
- experimental: `mark test`

Can have a `read/hint` folder with all the abstracted notes on the tasks
and forms and such.

    load ./foo
      find task create-something
      find task do-another

    task create-something
      note <Something>
    task do-another
      note <Another>

Similar to how you isolate tests from source code.

Or, import the notes into your source code.

    host create-something
      text <Something>

    # then in the file
    load ./read/task/stuff
      find note create-something

    task create-something
      note create-something

---

    call {{name}}

    form: 'call',
    name: LinkKnit | MeshLink (path) | MeshTerm

    {{call}} name

The non-leaf nodes need to be resolved by compile time.

As these non-leaf nodes are being interpolated, they spawn tasks to
resolve them when they are complete, and add them to the data model.

    mesh.tree => links to link tree

Wait on it to resolve. Watches a module for a specific path. If the path
is an array, then it waits until the `done` trigger on the array
children, so it knows it has received all the array elements.

    card.bindingSet()
      .waitFor('a')
      .waitFor('b')
      .waitFor('someArray/*/link/*')
      .waitForArray('someArray')
        .waitFor('link/name')
      .then(() => {
        handle()
        removeFromBaseById()
      })
    card.set('a', 'foo')
    card.set('someArray', [{ link: { name: 'bar' } }])
    card.finish('someArray')

All objects in the AST need to be bindable / emit events.

    // BindingEnvironment
    class FillBase {

    }

    class FillDeck {

    }

    class FillFile {

    }

    class FillHook {

    }

    class FillList {

    }

    class FillSite {

    }

@termsurf/fill-mesh.js

A Bindable Fulfillment Library for Compiler AST Generation

So then in mesh.link, it will create a new
FillModule.hook().bind('foo/bar').bindList('form')

Then it will notify everything that gets attached in the future if it is
complete.

- if bindings already exist, and we set something and it fulfills the
  binding, then trigger.
- if bindings don't exist until after it's been fulfilled, then trigger
  immediately

Then in mesh.link

    // base.ts
    class Base {
      fill: FillBase
      card: Record<string, Card>
      task: Array<Task>
      // env vars
      host: Record<string, unknown>
    }

base.fill.save('link', cardFill)

- marked as completely bound (bindHook: true)
  - all wired up with required watchers
- list items are is completely added (bindSeed: true)
- mark as completely resolved (bindTake: true)
  - watchers are all resolved

So they have basically a shell.

So they have basically a shell. The shell is what we are watching for,
and it is filled with Bind objects. So we have the Fill tree and the
Bind tree.

    card.save('deep', deeplyNestedObject)

    fillCard.bind(card) // card is a site

    fillCard.wait('deep').wait('foo')

    deeplyNestedObject.save('foo', 'bar')

When you save the deeply nested object, it triggers the fill card which
is bound to it, and it marks it off.
