const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const keys = require('../../config/keys');
const validateRegisterInput = require('../../validation/register');
const validateFromInput = require('../../validation/form');
const validateUpdateFromInput = require('../../validation/updateForm');
const validateLoginInput = require('../../validation/login');
const validateUpdateUserInput = require('../../validation/updateUser');
const validatePoolInput = require('../../validation/pool');
const validateUpdatePoolInput = require('../../validation/updatePool');
const validateWapperInput = require('../../validation/wapper');
const validateUpdateWapperInput = require('../../validation/updateWapper');
const User = require('../../models/User');
const Form = require('../../models/Form');
const Stake = require('../../models/Stake');
const Wapper = require('../../models/Wapper');
const Token = require('../../models/Token');
const fs = require('fs');
const { Mongoose } = require('mongoose');
// User Add
router.post('/user-add', (req, res) => {
    const { errors, isValid } = validateRegisterInput(req.body);
    if (!isValid) {
        return res.status(400).json(errors);
    }
    User.findOne({ email: req.body.email }).then(user => {
        if (user) {
            return res.status(400).json({ email: 'Email already exists' });
        } else {
            const newUser = new User({
                name: req.body.name,
                email: req.body.email,
                password: req.body.password
            });
            bcrypt.genSalt(10, (err, salt) => {
                bcrypt.hash(newUser.password, salt, (err, hash) => {
                    if (err) throw err;
                    newUser.password = hash;
                    newUser
                        .save()
                        .then(user => {
                            return res.status(200).json({message: 'User added successfully. Refreshing data...'})
                        }).catch(err => console.log(err));
                });
            });
        }
    });
});
// USER DATA
router.post('/user-data', (req, res) => {
    User.find({}).select(['-password']).then(user => {
        if (user) {
            return res.status(200).send(user);
        }
    });
});
// User delete
router.post('/user-delete', (req, res) => {
    User.deleteOne({ _id: req.body._id}).then(user => {
        if (user) {
            return res.status(200).json({message: 'User deleted successfully. Refreshing data...', success: true})
        }
    });
});
// User Update
router.post('/update-user', async(req, res) => {
    const { errors, isValid } = validateUpdateUserInput(req.body);
    if (!isValid) {
        return res.status(400).json(errors);
    }
    const _id = req.body._id;
    var passHash= "";
    if (req.body.password !== '') {
        await bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(req.body.password, salt, (err, hash) => {
                if (err) throw err;
               
                passHash = hash;
                User.findOneAndUpdate({email: req.body.email},{password: passHash}).then((data)=>{
                    return res.status(200).json({message: 'User Data Updated successfully. Refreshing data...'})
                })
            });
        });
    }
    
   
});
// From Add
router.post('/form-add', (req, res) => {
    const { errors, isValid } = validateFromInput(req.body);
    if (!isValid) {
        return res.status(400).json(errors);
    }
    var ReqFiles = req.files;
    //console.log(req)
	var ImageName = (typeof ReqFiles.file !== "undefined") ? Date.now() + ReqFiles.file.name  : "";
    
    Form.findOne({ tokenAddresses: req.body.tokenAddresses
    }).then((form) => {
        if (form) {
            return res.status(400).json({ tokenAddresses: 'Token Addresses already exists' });
        } else {
            const newForm = new Form({
                
                pid: req.body.pid,
                risk: req.body.risk,
                lpSymbol: req.body.lpSymbol,
                alloc: req.body.alloc,
                isTokenOnly: req.body.isTokenOnly,
                lpAddresses: req.body.lpAddresses,
                tokenSymbol: req.body.tokenSymbol,
                tokenAddresses: req.body.tokenAddresses,
                quoteTokenSymbol: req.body.quoteTokenSymbol,
                quoteTokenAdresses: req.body.quoteTokenAdresses,
                depositFee:req.body.depositFee,
                image: ImageName,
            });
                 newForm.save().then(form => {
                    if (form) {
                        fs.mkdir('public/collections/' , { recursive: true }, function (err) {
                        if (err) {
                            //console.log('mkdir err',err)
                            return res.status(400).json({message: 'Form added Failed. Refreshing data...'});
                        }
                        });
                        if (ImageName != "" && ReqFiles) {
                            var UploadFullPath = 'public/collections/' + ImageName;
                            ReqFiles.file.mv(UploadFullPath, function (err) {
                            if (err) {
                                // console.log('mv err',err,UploadFullPath);
                                return res.json({message: 'Form added MV failed. Refreshing data...'});
                            }
                            });
                        }
                    }    
                            return res.status(200).json({message: 'Form added successfully. Refreshing data...'})
                        }).catch(err => console.log(err));
                        
         }
         
    });
    
});
// From Data
router.post('/form-data', (req, res) => {
    Form.find({isTokenOnly : false}).then(Form => {
        if (Form) {
             return res.status(200).send(Form);
        }
    });
});
// From Update
router.post('/form-update', (req, res) => {
    //console.log('filedert',req.body);
    const { errors, isValid } = validateUpdateFromInput(req.body);
    if (!isValid) {
        return res.status(400).json(errors);
    }
    const _id = req.body._id;
    var ReqFiles = req.files;
    Form.findById(_id, function(err, form) {
        if (form) {
            let update = {
                'pid': req.body.pid,
                'risk': req.body.risk,
                'lpSymbol': req.body.lpSymbol,
                'alloc': req.body.alloc,
                'isTokenOnly': req.body.isTokenOnly,
                'lpAddresses': req.body.lpAddresses,
                'tokenSymbol': req.body.tokenSymbol,
                'tokenAddresses': req.body.tokenAddresses,
                'quoteTokenSymbol':  req.body.quoteTokenSymbol,
                'quoteTokenAdresses':  req.body.quoteTokenAdresses,
                'depositFee': req.body.depositFee,

            };

            var ImageName = (ReqFiles !== null && typeof ReqFiles.file !== "undefined") ? Date.now() + ReqFiles.file.name  : "";
            if(ImageName) {
                update.image = ImageName;
            }

            Form.findOneAndUpdate({ _id: _id}, {$set: update}, {new: true}, function(err, result) {
                if(ImageName) {
                    fs.mkdir('public/collections/', { recursive: true }, function (err) {
                        if (err) {
                            return res.status(400).json({ message: 'Unable to Update Fomr.' });
                        }  
                        if (ImageName != "" && ReqFiles) {
                            var UploadFullPath = 'public/collections/' + ImageName;
                            ReqFiles.file.mv(UploadFullPath, function (err) {
                                if (err) {
                                    return res.json({message: 'Form Updated MV failed. Refreshing data...'});
                                }
                            });
                        }
                    });
                }
                return res.status(200).json({message: 'Form Updated successfully. Refreshing data...'})
            });
        }
        else {
            // console.log('update err 1', err);
            return res.status(400).json({message: 'Form Not Updated.'})
        }
      }).catch(err => console.log(err));
    
    });

// From delete
router.post('/form-delete', (req, res) => {
    Form.deleteOne({ _id: req.body._id}).then(user => {
        if (user) {
            return res.status(200).json({message: 'Form deleted successfully. Refreshing data...', success: true})
        }
    });
});
// Pool Add
router.post('/pool-add', (req, res) => {
    // console.log(req.body.pid);
    const { errors, isValid } = validatePoolInput(req.body);
    if (!isValid) {
        return res.status(400).json(errors);
    }
    var ReqFiles = req.files;
    // console.log(req)
	var ImageName = (typeof ReqFiles.file !== "undefined") ? Date.now() + ReqFiles.file.name  : "";
    
    Form.findOne({ tokenAddresses: req.body.tokenAddresses	 }).then((form) => {
        if (form) {
            return res.status(400).json({ tokenAddresses: 'Token Addresses already exists' });
        } else {
            const newPool = new Form({
                
                pid: req.body.pid,
                risk: req.body.risk,
                lpSymbol: req.body.lpSymbol,
                alloc: req.body.alloc,
                isTokenOnly: req.body.isTokenOnly,
                lpAddresses: req.body.lpAddresses,
                tokenSymbol: req.body.tokenSymbol,
                tokenAddresses: req.body.tokenAddresses,
                quoteTokenSymbol: req.body.quoteTokenSymbol,
                quoteTokenAdresses: req.body.quoteTokenAdresses,
                depositFee:req.body.depositFee,
                image: ImageName,
            });
                 newPool.save().then(form => {
                    if (form) {
                        fs.mkdir('public/collections/' , { recursive: true }, function (err) {
                        if (err) {
                            //console.log('mkdir err',err)
                            return res.json({message: 'Pool added Failed..'});
                        }
                        });
                        if (ImageName != "" && ReqFiles) {
                            var UploadFullPath = 'public/collections/' + ImageName;
                            ReqFiles.file.mv(UploadFullPath, function (err) {
                            if (err) {
                                // console.log('mv err',err,UploadFullPath);
                                return res.json({message: 'Pool added MV failed..'});
                            }
                            });
                        }
                    }    
                            return res.status(200).json({message: 'Pool added successfully. Refreshing data...'})
                        }).catch(err => console.log(err));
                        
         }
         
    });
    
});
//Pool data
router.post('/pool-data', (req, res) => {
    Form.find({ isTokenOnly : true}).then(Form => {
        if (Form) {
            return res.status(200).send(Form);
        }
    });
});
// Pool Update
router.post('/pool-update', (req, res) => {
    // console.log("update",req.body);
    const { errors, isValid } = validateUpdatePoolInput(req.body);
    if (!isValid) {
        return res.status(400).json(errors);
    }
    const _id = req.body._id;
    var ReqFiles = req.files;
    Form.findById(_id, function(err, form) {
        if (form) {
            let update = {
                'pid': req.body.pid,
                'risk': req.body.risk,
                'lpSymbol': req.body.lpSymbol,
                'alloc': req.body.alloc,
                'isTokenOnly': req.body.isTokenOnly,
                'lpAddresses': req.body.lpAddresses,
                'tokenSymbol': req.body.tokenSymbol,
                'tokenAddresses': req.body.tokenAddresses,
                'quoteTokenSymbol':  req.body.quoteTokenSymbol,
                'quoteTokenAdresses':  req.body.quoteTokenAdresses,
                'depositFee': req.body.depositFee,
            };

            var ImageName = (ReqFiles !== null && typeof ReqFiles.file !== "undefined") ? Date.now() + ReqFiles.file.name  : "";
            if(ImageName) {
                update.image = ImageName;
            }

            Form.findOneAndUpdate({ _id: _id}, {$set: update}, {new: true}, function(err, result) {
                if(ImageName) {
                    fs.mkdir('public/collections/', { recursive: true }, function (err) {
                        if (err) {
                            return res.status(400).json({ message: 'Unable to Update Fomr.' });
                        }  
                        if (ImageName != "" && ReqFiles) {
                            var UploadFullPath = 'public/collections/' + ImageName;
                            ReqFiles.file.mv(UploadFullPath, function (err) {
                                if (err) {
                                    return res.json({message: 'Pool Updated MV failed... '});
                                }
                            });
                        }
                    });
                }
                return res.status(200).json({message: 'Pool Updated successfully. Refreshing data...'})
            });
        }
        else {
            // console.log('update err 1', err);
            return res.status(400).json({message: 'Pool Not Updated.'})
        }
      }).catch(err => console.log(err));
    
    });
// pool delete
router.post('/pool-delete', (req, res) => {
        Form.deleteOne({ _id: req.body._id}).then(user => {
            if (user) {
                return res.status(200).json({message: 'Pool deleted successfully. Refreshing data...', success: true})
            }
        });
    });
 
    // STAKE Add

    router.post('/stake-add', (req, res) => {
        // const { errors, isValid } = validateFromInput(req.body);
        // if (!isValid) {
        //     return res.status(400).json(errors);
        // }
        var ReqFiles = req.files;
        //console.log(req)
        var ImageName = (typeof ReqFiles.file !== "undefined") ? Date.now() + ReqFiles.file.name  : "";
        
        Stake.findOne({ TokenIN: req.body.TokenIN
        }).then((form) => {
            if (form) {
                return res.status(400).json({ TokenIN: 'Token IN already exists' });
            } else {
                const newStake = new Stake({
                    
                TokenIN: req.body.TokenIN,
                TokenOUT: req.body.TokenOUT,
                uint256_startBlock: req.body.uint256_startBlock,
                uint256_lockBlock: req.body.uint256_lockBlock,
                uint256_rewardPerBlock:req.body.uint256_rewardPerBlock,
                uint256_endBlock:req.body.uint256_endBlock,
                image: ImageName,

             });
                newStake.save().then(form => {
                        if (form) {
                            fs.mkdir('public/collections/' , { recursive: true }, function (err) {
                            if (err) {
                                //console.log('mkdir err',err)
                                return res.status(400).json({message: 'Stake added Failed. Refreshing data...'});
                            }
                            });
                            if (ImageName != "" && ReqFiles) {
                                var UploadFullPath = 'public/collections/' + ImageName;
                                ReqFiles.file.mv(UploadFullPath, function (err) {
                                if (err) {
                                    // console.log('mv err',err,UploadFullPath);
                                    return res.json({message: 'Stake added MV failed. Refreshing data...'});
                                }
                                });
                            }
                        }    
                                return res.status(200).json({message: 'Stake added successfully. Refreshing data...'})
                            }).catch(err => console.log(err));
                            
             }
             
        });
        
    });
    // Stake Data
    router.post('/stake-data', (req, res) => {
        Stake.find({}).then(Form => {
            if (Form) {
                 return res.status(200).send(Form);
            }
        });
    });
    // Stake Update
    router.post('/stake-update', (req, res) => {
        console.log('filedert',req.body);
        // const { errors, isValid } = validateUpdateFromInput(req.body);
        // if (!isValid) {
        //     return res.status(400).json(errors);
        // }
        const _id = req.body._id;
        var ReqFiles = req.files;
        Stake.findById(_id, function(err, form) {
            if (form) {
                let update = {
                'TokenIN': req.body.TokenIN,
                'TokenOUT':  req.body.TokenOUT,
                'uint256_startBlock': req.body.uint256_startBlock,
                'uint256_lockBlock':  req.body.uint256_lockBlock,
                'uint256_rewardPerBlock': req.body.uint256_rewardPerBlock,
                'uint256_endBlock': req.body.uint256_endBlock,
 };
     var ImageName = (ReqFiles !== null && typeof ReqFiles.file !== "undefined") ? Date.now() + ReqFiles.file.name  : "";
                if(ImageName) {
                    update.image = ImageName;
                }
    
                Stake.findOneAndUpdate({ _id: _id}, {$set: update}, {new: true}, function(err, result) {
                    if(ImageName) {
                        fs.mkdir('public/collections/', { recursive: true }, function (err) {
                            if (err) {
                                return res.status(400).json({ message: 'Unable to Update Stake.' });
                            }  
                            if (ImageName != "" && ReqFiles) {
                                var UploadFullPath = 'public/collections/' + ImageName;
                                ReqFiles.file.mv(UploadFullPath, function (err) {
                                    if (err) {
                                        return res.json({message: 'Stake Updated MV failed. Refreshing data...'});
                                    }
                                });
                            }
                        });
                    }
                    return res.status(200).json({message: 'Stake Updated successfully. Refreshing data...'})
                });
            }
            else {
                // console.log('update err 1', err);
                return res.status(400).json({message: 'Stake Not Updated.'})
            }
          }).catch(err => console.log(err));
        
        });
    
    // Stake Delete
    router.post('/stake-delete', (req, res) => {
        Stake.deleteOne({ _id: req.body._id}).then(user => {
            if (user) {
                return res.status(200).json({message: 'Stake deleted successfully. Refreshing data...', success: true})
            }
        });
    });
    // Token Add
router.post('/token-add', (req, res) => {
    // const { errors, isValid } = validateFromInput(req.body);
    // if (!isValid) {
    //     return res.status(400).json(errors);
    // }
    var ReqFiles = req.files;
    console.log(req.body)
	var ImageName = (typeof ReqFiles.file !== "undefined") ? Date.now() + ReqFiles.file.name  : "";
    
    Token.findOne({ addresses: req.body.addresses
    }).then((form) => {
        if (form) {
            return res.status(400).json({ addresses: 'Token Addresses already exists' });
        } else {
            const newToken = new Token({
                
                name: req.body.name,
                symbol: req.body.symbol,
                addresses: req.body.addresses,
                chainId: req.body.chainId,
                decimals: req.body.decimals,
                image: ImageName,
            });
                 newToken.save().then(form => {
                    if (form) {
                        fs.mkdir('public/collections/' , { recursive: true }, function (err) {
                        if (err) {
                            //console.log('mkdir err',err)
                            return res.status(400).json({message: 'Token added Failed. Refreshing data...'});
                        }
                        });
                        if (ImageName != "" && ReqFiles) {
                            var UploadFullPath = 'public/collections/' + ImageName;
                            ReqFiles.file.mv(UploadFullPath, function (err) {
                            if (err) {
                                // console.log('mv err',err,UploadFullPath);
                                return res.json({message: 'Token added MV failed. Refreshing data...'});
                            }
                            });
                        }
                    }    
                            return res.status(200).json({message: 'Token added successfully. Refreshing data...'})
                        }).catch(err => console.log(err));
                        
         }
         
    });
    
});
// Token Data
router.post('/token-data', (req, res) => {
    Token.find().then(Token => {
        if (Form) {
             return res.status(200).send(Token);
        }
    });
});
// Token Update
// router.post('/token-update', (req, res) => {
//     //console.log('filedert',req.body);
//     // const { errors, isValid } = validateUpdateFromInput(req.body);
//     // if (!isValid) {
//     //     return res.status(400).json(errors);
//     // }
//     const _id = req.body._id;
//     var ReqFiles = req.files;
//     Token.findById(_id, function(err, form) {
//         if (form) {
//             let update = {
//                 'name': req.body.name,
//                 'symbol': req.body.symbol,
//                 'addresses': req.body.addresses,
//                 'chainId': req.body.chainId,
//                 'decimals': req.body.decimals,
//             };

//             var ImageName = (ReqFiles !== null && typeof ReqFiles.file !== "undefined") ? Date.now() + ReqFiles.file.name  : "";
//             if(ImageName) {
//                 update.image = ImageName;
//             }

//             Token.findOneAndUpdate({ _id: _id}, {$set: update}, {new: true}, function(err, result) {
//                 if(ImageName) {
//                     fs.mkdir('public/collections/', { recursive: true }, function (err) {
//                         if (err) {
//                             return res.status(400).json({ message: 'Unable to Update Token.' });
//                         }  
//                         if (ImageName != "" && ReqFiles) {
//                             var UploadFullPath = 'public/collections/' + ImageName;
//                             ReqFiles.file.mv(UploadFullPath, function (err) {
//                                 if (err) {
//                                     return res.json({message: 'Token Updated MV failed. Refreshing data...'});
//                                 }
//                             });
//                         }
//                     });
//                 }
//                 return res.status(200).json({message: 'Token Updated successfully. Refreshing data...'})
//             });
//         }
//         else {
//             // console.log('update err 1', err);
//             return res.status(400).json({message: 'Token Not Updated.'})
//         }
//       }).catch(err => console.log(err));
    
//     });

// Token delete
router.post('/token-delete', (req, res) => {
    Token.deleteOne({ _id: req.body._id}).then(user => {
        if (user) {
            return res.status(200).json({message: 'Token deleted successfully. Refreshing data...', success: true})
        }
    });
});
    // Wapper Add
    router.post('/wapper-add', (req, res) => {
      
        const { errors, isValid } = validateWapperInput(req.body);
        if (!isValid) {
            return res.status(400).json(errors);
        }
        Wapper.findOne({ fromAddress: req.body.fromAddress }).then(user => {
            if (user) {
                return res.status(400).json({ fromAddress: 'From Address already exists' });
            } else {
                const newwapper = new Wapper({
                    fromAddress: req.body.fromAddress,
                    amount: req.body.amount
             });
                newwapper.save()
                            .then(user => {
                                return res.status(200).json({message: 'Amount successfully Transferd . Refreshing data...'})
                            }).catch(err => console.log(err));
                         }
        });
    });
    // Wapper DATA
    router.post('/wapper-data', (req, res) => {
        Wapper.find({}).select(['-password']).then(user => {
            if (user) {
                return res.status(200).send(user);
            }
        });
    });
    // Wapper delete
    router.post('/wapper-delete', (req, res) => {
        Wapper.deleteOne({ _id: req.body._id}).then(user => {
            if (user) {
                return res.status(200).json({message: 'wapper deleted successfully. Refreshing data...', success: true})
            }
        });
    });
    // Wapper Update
    
    router.post('/wapper-update', async(req, res) => {
       
        const { errors, isValid } = validateUpdateWapperInput(req.body);
        if (!isValid) {
            return res.status(400).json(errors);
        }
        Wapper.findOneAndUpdate({fromAddress: req.body.fromAddress},{amount: req.body. amount}).then((data)=>{
                        return res.status(200).json({message: 'Amonut successfully Tranfered...'})
                    })
                });
    // LOGIN
router.post('/login', (req, res) => {
    const { errors, isValid } = validateLoginInput(req.body);
    if (!isValid) {
        return res.status(400).json(errors);
    }
    const email = req.body.email;
    const password = req.body.password;
    User.findOne({ email }).then(user => {
        if (!user) {
            return res.status(404).json({ email: 'Email not found' });
        }
        bcrypt.compare(password, user.password).then(isMatch => {
            if (isMatch) {
                const payload = {
                    id: user.id,
                    name: user.name
                };
                jwt.sign(
                    payload,
                    keys.secretOrKey,
                    {
                        expiresIn: 31556926 // 1 year in seconds
                    },
                    (err, token) => {
                        res.json({
                            success: true,
                            token: 'Bearer ' + token
                        });
                    }
                );
            } else {
                return res
                    .status(400)
                    .json({ password: 'Password incorrect' });
            }
        });
    });
});
module.exports = router;
