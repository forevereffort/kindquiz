<!-- 

    async downloadVisualReport() {
      if (this.mobile) {
        alert('PDF download not available on small-screen device')
        return
      }
      let vc = this
      this.generatingPDF = true
      try {
        const html2canvas = require('html2canvas');
        let canvas = await html2canvas(vc.showCaptureRef(this.$refs.capture))
        let causesCanvas = await html2canvas(vc.showCaptureRef(this.$refs.causes))
        let famousCanvas = await html2canvas(vc.showCaptureRef(this.$refs.famous))

        
        const jsPDF = require('jspdf')

        let pdf = new jsPDF()
        var imgData = canvas.toDataURL("image/png", 1.0)
        let width = Number
        let height = Number
        var imgDataCauses = causesCanvas.toDataURL("image/png", width = causesCanvas.width, height = causesCanvas.height)
        var imgDataFamous = famousCanvas.toDataURL("image/png", 1)

        let hratio = height / width
        width = pdf.internal.pageSize.getWidth()
        height = width * hratio

        let profileImage = await this.addImageProcess(this.revealPage.profileImage)
        let celebImages = []
        let celebImage = null
        for (var i = 0; i < this.revealPage.famousPeople.length; i++) {
          celebImage = await this.addImageProcess(this.revealPage.famousPeople[i].image)
          celebImages.push(celebImage)
        }
        pdf.addImage(profileImage, 'JPEG', -40, 0, pdf.internal.pageSize.getWidth() + 90, pdf.internal.pageSize.getHeight())


        pdf.setFontSize(50)
        pdf.setTextColor(255, 255, 255)
        pdf.text(this.profile.name, pdf.internal.pageSize.getWidth() / 2, 60, null, null, 'center')
        pdf.setFontSize(10)
        pdf.setTextColor(40, 40, 40)
        pdf.text(`Powered by Summery.ai`, pdf.internal.pageSize.getWidth() / 2, 290, null, null, 'center')

        pdf.addPage()

        pdf.setFontSize(30)
        pdf.setTextColor(50, 50, 50)
        pdf.text(this.revealPage.captionOne, pdf.internal.pageSize.getWidth() / 2, 80, { align: 'center', maxWidth: pdf.internal.pageSize.getWidth() / 1.4 })
        // pdf.text(this.profile.name, 20, 20)
        // pdf.text(this.revealPage.captionOne, 20, 50, { maxWidth: 100 })
        pdf.setFontSize(10)
        pdf.setTextColor(40, 40, 40)
        pdf.text(`Powered by Summery.ai`, pdf.internal.pageSize.getWidth() / 2, 290, null, null, 'center')
        pdf.addPage()
        pdf.setTextColor(50, 50, 50)
        pdf.setFontSize(30)
        pdf.text(`Your ${this.profile.name} traits`, pdf.internal.pageSize.getWidth() / 2, 60, { align: 'center', maxWidth: pdf.internal.pageSize.getWidth() / 1.4 })
        pdf.addImage(imgData, 'PNG', 0, 80, pdf.internal.pageSize.getWidth(), pdf.internal.pageSize.getHeight() / (document.documentElement.clientWidth < 1264 ? 1.9 : 3))
        pdf.setFontSize(10)
        pdf.setTextColor(40, 40, 40)
        pdf.text(`Powered by Summery.ai`, pdf.internal.pageSize.getWidth() / 2, 290, null, null, 'center')
        pdf.addPage()

        pdf.setTextColor(50, 50, 50)
        pdf.setFontSize(30)
        pdf.text(`Causes you care about most`, pdf.internal.pageSize.getWidth() / 2, 130, { align: 'center', maxWidth: pdf.internal.pageSize.getWidth() / 1.4 })
        pdf.setFontSize(15)
        for (i = 0; i < this.causes.length; i++) {
          pdf.text(this.causes[i], pdf.internal.pageSize.getWidth() / 2, 145 + (i * 10), { align: 'center', maxWidth: pdf.internal.pageSize.getWidth() / 1.1 })
        }
        pdf.addImage(imgDataCauses, 'PNG', 0, 20, width, height)
        pdf.setFontSize(10)
        pdf.setTextColor(40, 40, 40)
        pdf.text(`Powered by Summery.ai`, pdf.internal.pageSize.getWidth() / 2, 290, null, null, 'center')



        pdf.addPage()

        pdf.setTextColor(50, 50, 50)
        pdf.setFontSize(30)
        pdf.text(`Famous ${this.profile.name} personalities`, pdf.internal.pageSize.getWidth() / 2, 30, { align: 'center', maxWidth: pdf.internal.pageSize.getWidth() / 1.4 })
        pdf.setFontSize(15)
        for (i = 0; i < (this.revealPage.famousPeople.length / 2); i++) {
          pdf.addImage(celebImages[i], 'JPEG', 50 + (i * 40), 50, 25, 25)
          // pdf.text(this.revealPage.famousPeople[i].name, (pdf.internal.pageSize.getWidth() / 3 ) + (i * 6), 90, null, null, 'center')
        }
        var j = 0
        for (i = (this.revealPage.famousPeople.length / 2); i < this.revealPage.famousPeople.length; i++) {
          pdf.addImage(celebImages[i], 'JPEG', 50 + (j * 40), 80, 25, 25)
          j++
        }
        pdf.addImage(imgDataFamous, 'PNG', 0, 115, pdf.internal.pageSize.getWidth(), pdf.internal.pageSize.getHeight() / 1.8)
        pdf.setFontSize(10)
        pdf.setTextColor(40, 40, 40)
        pdf.text(`Powered by Summery.ai`, pdf.internal.pageSize.getWidth() / 2, 290, null, null, 'center')


        pdf.save("Kind Profile.pdf")
        this.generatingPDF = false

      } catch (e) {
        console.log(e)
        this.generatingPDF = false
      }
    },
    addImageProcess(src) {
      return new Promise((resolve, reject) => {
        let img = new Image()
        img.crossOrigin = "Anonymous"
        img.width = 100
        img.onload = () => {
          resolve(img)
        }
        img.onerror = reject
        img.src = src + '?_' // omg ... horrible cors error since image had already been downloaded and cached. this ?_ forces browser to not use cache.
      })
    }, -->