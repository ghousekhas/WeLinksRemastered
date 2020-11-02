useFocusEffect(
        React.useCallback(() => {
            Axios.get(Config.api_url + 'php?action=getUser&phone=' + actualUser.phone,).
                then(({ data }) => {
                    if (data.user[0] != undefined) {
                        setProfileDetails(data.user[0]);

                        //  route.params.setActualUser(data.user[0]);
                    }
                    else
                        console.log('User does not exitst', data);
                    Axios.get(Config.api_url + 'php?action=getVendorStatus&user_id=' + data.user[0].user_id).
                        then((response) => {
                            console.log("vendorID" + response.data.vendor[0].vendor_id)

                            Axios.get(Config.api_url + "php?action=getVendor&vendor_id=" + vendorID)
                                .then((response) => {
                                    try {
                                        setVPD(response.data.vendor)
                                        console.log("id" + VendorProfileDetails.vendor_id);
                                        console.log("vpd " + response.data.vendor.company_name)

                                        setVendorImage(response.data.vendor.vendor_img_url);
                                        //   setServedAddresses(response.data.vendor.addresses);
                                        // console.log("add" + response.data.vendor.addresses[0].addr_name)
                                        // console.log("image" +vendorImage)

                                        //    this.setState({actualVendor : this.state.vendorDetails.company_name})
                                        //  console.log('Vd' + this.state.actualVendor)
                                    }
                                    catch (error) {
                                        //  this.setState({validVendor: false})

                                        console.log('the error ' + error);

                                    }
                                }, (error) => {
                                    console.log('error' + error);

                                });





                        }), (error) => console.log(error);







                },
                    (error) => console.log('Error logged in profile', error))
            const onBackPress = () => {
                //  console.log('Can\'t go back from here');
                navigation.toggleDrawer();


                return true;

            };


            BackHandler.addEventListener('hardwareBackPress', onBackPress);
            setActualUser(route.params.actualUser);

            return () =>
                BackHandler.removeEventListener('hardwareBackPress', onBackPress);
        }



        ),[vendorID]
      
    );