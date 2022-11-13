import * as monaco from 'monaco-editor'

class Editor
{
	static getInstance()
	{
		let instance = document.querySelector('.editor')
		if(!instance)
		{
			instance = document.createElement('div')
			instance.setAttribute('class', 'editor')
			document.querySelector('body').appendChild(instance)
		}
		return instance
	}

	static create(text)
	{
		return monaco.editor.createModel(text)
	}

	static diff(original, modified)
	{
		// The diff editor offers a navigator to jump between changes. Once the diff is computed the <em>next()</em> and <em>previous()</em> method allow navigation. By default setting the selection in the editor manually resets the navigation state.
		let self		= this
		let instance	= self.getInstance()

		const diff_editor	= monaco.editor.createDiffEditor(instance,
		{
			originalEditable: true
		})
		diff_editor.setModel(
		{
			original: self.create(original),
			modified: self.create(modified)
		});

		return diff_editor
	}
}

export default Editor