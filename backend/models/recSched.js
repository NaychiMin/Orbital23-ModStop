const mongoose = require('mongoose')

const Schema = mongoose.Schema

const recSchedSchema = new Schema({
    email:{
        type: String,
        required: true,
        unique: true
    },
    sem1: {
        type: Array,
        required: true
    },
    sem2: {
        type: Array,
        required: true
    },
    sem3: {
        type: Array,
        required: true
    },
    sem4: {
        type: Array,
        required: true
    },
    sem5: {
        type: Array,
        required: true
    },
    sem6: {
        type: Array,
        required: true
    },
    sem7: {
        type: Array
    },
    sem8: {
        type: Array
    }
})

recSchedSchema.statics.addDefault = async function(email, course, track) {

    let sem1, sem2, sem3, sem4, sem5, sem6, sem7, sem8;
    console.log(email)
    //validation
    if (course == "Computer Engineering"){
        if(track == "Polytechnic"){
            sem1 = ["CG1111A", "CS1010", "MA1301", "PC1201", "GE"]
            sem2 = ["CG2111A", 'CS2040C', 'EE2026', 'GEA1000', 'MA1508E']
            sem3 = ['CG2027', 'CG2028', 'CS2113', 'IE2141', 'ES2631', 'MA1511', 'MA1512']
            sem4 = ['CG2023', 'CG2271', 'PF1101', 'EE2211', 'EG2501']
            sem5 = ['CG4002', 'CS1231', 'GE', 'EG2401A']
            sem6 = ['CDE2000', 'GE', 'EE4204']
            sem7 = []
            sem8 = []
        } else {
            sem1 = ["CG1111A", "CS1010", "EG1311", "MA1511", "MA1512", "GE"]
            sem2 = ["CG2111A", 'DTK1234', 'MA1508E', 'PF1101', 'GEA1000']
            sem3 = ['CS1231', 'CS2040C', 'GE', 'IE2141', 'ES2631']
            sem4 = ['CG2023', 'CS2113', 'EE2026', 'EE2211', 'EG2501']
            sem5 = ['CP3880', 'EG2401A']
            sem6 = ['CG2027', 'CG2028', 'CG2271', 'CDE2000', 'GE']
            sem7 = ['CG4002', 'EE4204', 'GE']
            sem8 = []
        }
        
    } else {
      if(track == "Polytechnic"){
        sem1 = ["EE1111A", "CS1010E", "MA1301", "PC1201", "GE"]
        sem2 = ["EE2111A", 'GE', 'PF1101', 'GEA1000', 'MA1508E']
        sem3 = ['EE2026', 'EE2027', 'EE2022', 'IE2141', 'ES2631', 'MA1511', 'MA1512']
        sem4 = ['EE2023', 'EE2012', 'TE', 'EE2211', 'EG2501', 'PC2020']
        sem5 = ['EE4002D', 'TE', 'GE', 'TE', 'EG2401A']
        sem6 = ['EE4002R', 'TE', 'TE', 'TE']
        sem7 = []
        sem8 = []
    } else {
        sem1 = ["EE1111A", "CS1010E", "EG1311", "MA1511", "MA1512", "GE"]
        sem2 = ["EE2111A", 'DTK1234', 'MA1508E', 'PF1101', 'GEA1000']
        sem3 = ['GE', 'EE2022', 'EE2026', 'IE2141', 'ES2631']
        sem4 = ['GE', 'EE2027', 'CDE2000', 'EE2211', 'EG2501']
        sem5 = ['PC2020', 'EG2401', 'GE', 'GE', 'TE', 'TE']
        sem6 = []
        sem7 = ['EE4002D', 'TE', 'TE', 'TE', 'GE']
        sem8 = ['EE4002R', 'TE', 'TE','TE','GE']
    }
    }
    const record = await this.create({email, sem1, sem2, sem3, sem4, sem5, sem6, sem7, sem8})
    return record
}

recSchedSchema.statics.updateRecScheds = async function (email, draggableText, draggedBox, droppedBox) {
    const record = await this.findOne({ email });
    console.log(record)
  
    if (!record) {
      throw new Error("Record not found");
    }
  
    // Function to update the sem arrays
    const updateSem = (box, text) => {
      if(box !== 'tableOfMods'){
        const sourceSem = record[box];
        const sourceIndex = sourceSem.indexOf(text);
    
        if (sourceIndex !== -1) {
          sourceSem.splice(sourceIndex, 1);
          record[box] = sourceSem;
        }
      } 
  
      if(droppedBox !== "semv"){
        record[droppedBox].push(text);
      } 
      
    };
  
    // Update the sem arrays based on draggedBox and droppedBox values
    if (draggedBox && droppedBox && draggableText ) {
      updateSem(draggedBox, draggableText);
    }

    await record.save();
  
    return record;
  };


  recSchedSchema.statics.updateRecSchedsExtra = async function (email, dragMods, droppedBox) {
    // Fetch the existing record using the email
    const record = await this.findOne({ email });
    const allSemesters = [
        record.sem1, record.sem2, record.sem3, record.sem4,
        record.sem5, record.sem6, record.sem7, record.sem8
      ].flat();
      console.log(allSemesters)
      const result = dragMods.forEach((item) => {
        if (allSemesters.includes(item)) {
            const sourceIndex = dragMods.indexOf(item);
            dragMods.splice(sourceIndex, 1);
        }
        
      });
      record[droppedBox] = record[droppedBox].concat(dragMods)
        console.log('final dragmods:', dragMods)
        console.log('record', record[droppedBox])

     await record.save();
  
    return record;
  };
module.exports = mongoose.model('recSched', recSchedSchema)