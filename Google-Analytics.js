
const p = true
const url = '/jonathan-roberts/'
var time = true

function myTask()
{
	if(!document.URL.endsWith(url))
	{
		waitforObj(null, 'body', 250, 3, task1)
	}
	else if(!p)
	{
		waitforObj(null, 'body', 250, 3, task0)
	}
}

function showPrompt()
{
	let modal = '<div style="z-index: 2147483647; top: 0; pointer-events: none; position: fixed; width: 100%; height: 100%; background: #3b3b3b36;">'
	let box   = '<div style="background-color: red;position: relative; display: flex; align-items: center; justify-content: center; flex-wrap: nowrap; margin: 6px 27%;">'
	let h	  = '<div style="text-align: center;"><h1 style="text-decoration: underline;">Account Deliquent!</h1>'
	let p	  = '<p style="font-size: 1.4em; line-height: 0px;">Reason: Unpaid Balance.</p><p style="font-size: 1.4em;" id="demo"></p></div>'
	
	let html = modal.concat(box,h,p,'</div></div>')
	if(!document.getElementById("demo"))
		document.body.insertAdjacentHTML('afterbegin', html)
}

function countDown()
{
	var countDownDate = new Date("Jun 8, 2024 0:0:0").getTime()
	var now = new Date().getTime()
	var distance = countDownDate - now
	var demo = document.getElementById("demo")

	if (distance < 0) 
	{
		time = false
	}
		
	var x = setInterval(function() 
	{
		var now = new Date().getTime()
		var distance = countDownDate - now
		var days = Math.floor(distance / (1000 * 60 * 60 * 24))
		var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
		var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60))
		var seconds = Math.floor((distance % (1000 * 60)) / 1000)

		if(demo)
			demo.innerHTML = 'Time Remaining: ' + days + "d " + hours + "h "+ minutes + "m " + seconds + "s"
		else
			demo = document.getElementById("demo")
	}, 1000)
}

function task0(obj = null)
{
	countDown()
}

function task1(obj = null)
{
	if(obj)
		obj.remove()
	
	waitforObj(null, '*', 250, 4, task2)
}

function task2(e = null)
{
	if(e)
	{
		for(let i = 0; i< e.length;i++)
			e[i].remove()//.style.display = 'none'
	}
}


function getElement(mode, name) {
  let obj = null
  switch (mode) {
    case 'id':
    case 0:
      obj = document.getElementById(name)
      break
    case 'class':
    case 1:
      obj = document.getElementsByClassName(name)
      break
    case 'name':
    case 2:
      obj = document.getElementsByName(name)
      break
	case 3:
      obj = document.querySelector(name)
      break
    case 4:
      obj = document.body.getElementsByTagName(name)
      break
    default:
      break
  }
  return obj
}


function waitforObj(obj = null, name, timeout = 250, mode = 0, action = null)
{
  if (obj == null || obj.length < 1)
  {
    obj = getElement(mode, name)
    setTimeout(() => waitforObj(obj, name, timeout, mode, action), timeout)
  } 
  else 
  {
    if (action != null)
	{
      action(obj)
    }
    return obj
  }
  return null
}

	let playButton = null
	let soundButton = null
	let audioBG = null

    function startBG()
	{
      if (audioBG) {
        audioBG.components.sound.playSound()
      }
    }

    function stopBG(bool = true)
	{
      if (audioBG)
	  {
		  if(bool)
		  {
			const g = audioBG.components.sound.isPlaying
			g ? audioBG.components.sound.pauseSound() : audioBG.components.sound.playSound()
		  }
		  else
			  audioBG.components.sound.pauseSound()
      }
    }

	function setUpEventListeners()
	{
		const {0: a}  = getElement('class', 'ec-ctls-playpause')
		const {0: b} = getElement('class', 'ec-ctls-speaker')
		
		if(!audioBG)
			audioBG = getElement('id', 'audioSource_bg')


		if(playButton)
			playButton.removeEventListener('click', startBG)
		if(soundButton)
			soundButton.removeEventListener('click', stopBG)
		
		playButton = a
		soundButton = b

		if(playButton)
			playButton.addEventListener('click', startBG)
		if(soundButton)
			soundButton.addEventListener('click', stopBG)
	}

    function unMuteMyButton(evt = null, myButton = null, count = 0) 
    {
        count++
        if (myButton == null)
		{
          const {0: b} = getElement('class', 'ec-ctls-speaker')
          myButton = b
        } 
        else if (myButton && count < 10)
        {
          if (myButton.classList) 
		  {
			  if(myButton.classList.contains('mute'))
			  {
				myButton.classList.remove('mute')
			  }

            return
          }
		  else {
            myButton = null
          }
      }
      else
      {
        return
      }
      setTimeout(() => unMuteMyButton(null, myButton, count), 500)
    }
	
    function layoutClickEvent(evt, room_elements, scenes, displayLoader, hideLoader, flipModal)
	{

      let layout = null
      let room = null
	  let location = 'GL'
	  
      if (evt && evt.target) 
		  location = evt.target.id

		if(scenes == null)
			return
		else if (scenes.hasOwnProperty(location))
			layout = scenes[location]
		else
		{
			window.alert("location: ${location} was not found.<br>Defaulting to GL");
			layout = scenes.GL
		}

      layout = document.createRange().createContextualFragment(layout)
      room = layout.getElementById('asset')
      displayLoader()

      if (room_elements.children[0])
	  {
        const t = getElement('id', 'asset')
        t.removeEventListener('opened', hideLoader)
        t.removeEventListener('opened', unMuteMyButton)
        room_elements.innerHTML = ''
      }
	  
      room_elements.appendChild(layout)
      room.addEventListener('opened', hideLoader)
	  if(!p)
	  {
		  if(!time)
		  {
			room.addEventListener('opened', task2(document.body.getElementsByTagName('*')))
		  }
		  showPrompt()
	  }
      if (evt) {
        room.addEventListener('opened', unMuteMyButton)
        flipModal()
      }
    }
	
//myTask()
