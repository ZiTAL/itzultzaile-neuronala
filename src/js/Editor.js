import * as monaco from 'monaco-editor'
import ItzultzaileNeuronala from    './ItzultzaileNeuronala'

class Editor
{
	static editor = null
	static createDom()
	{
		let dom = document.querySelector('.editor')
		if(!dom)
		{
			dom = document.createElement('div')
			dom.setAttribute('class', 'editor')
			document.querySelector('body').appendChild(dom)
		}
		return dom
	}

	static create(text)
	{
		return monaco.editor.createModel(text)
	}

	static diff(original, modified)
	{
		// The diff editor offers a navigator to jump between changes. Once the diff is computed the <em>next()</em> and <em>previous()</em> method allow navigation. By default setting the selection in the editor manually resets the navigation state.
		let self		= this
		let dom	= self.createDom()

		self.editor	= monaco.editor.createDiffEditor(dom,
		{
			originalEditable: true
		})

		self.editor.setModel(
		{
			original: self.create(original),
			modified: self.create(modified)
		})

		self.setKeyBindings(self.editor._originalEditor)
		self.setKeyBindings(self.editor._modifiedEditor)

		return self.editor
	}

	static setKeyBindings(editor)
	{
		let self = this
		editor.addAction(
		{
			// An unique identifier of the contributed action.
			id: 'itzuli',
		
			// A label of the action that will be presented to the user.
			label: 'Itzuli',
		
			// An optional array of keybindings for the action.
			keybindings:
			[
				monaco.KeyMod.CtrlCmd | monaco.KeyCode.Enter
			],
		
			// A precondition for this action.
			precondition: null,
		
			// A rule to evaluate on top of the precondition in order to dispatch the keybindings.
			keybindingContext: null,
		
			contextMenuGroupId: 'navigation',
		
			contextMenuOrder: 1.5,
		
			// Method that will be executed when the action is triggered.
			// @param editor The editor instance is passed in as a convenience
			run: function (ed)
			{
				//console.log("i'm running => " + ed.getPosition());
				self.run()
/*
				const original = self.editor.getOriginalEditor().getValue()
				ItzultzaileNeuronala.get(original)
				.then(function(modified)
				{
					self.editor.getModifiedEditor().setValue(modified)
				})
*/				
			}
		})
	}

	static run()
	{
		let self		= this
		const original	= self.editor.getOriginalEditor().getValue()
		ItzultzaileNeuronala.get(original)
		.then(function(modified)
		{
			self.editor.getModifiedEditor().setValue(modified)
		})		
	}
}

export default Editor