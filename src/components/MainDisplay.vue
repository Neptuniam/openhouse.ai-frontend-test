<template>
<div class="test">
    <div class="row center-xs fullWidth headerRow" uk-sticky>
        <div class="col-xs-12 col-md-6 col-lg-3">
            Image
        </div>

        <div class="col-xs-12 col-md-6 col-lg-3 start-lg">
            Community Name
        </div>

        <div class="col-xs-12 col-md-6 col-lg-3 start-lg">
            Community Group
        </div>

        <div class="col-xs-12 col-md-6 col-lg-2 start-lg">
            Average Price
        </div>

        <div class="col-xs-12 col-md-6 col-lg-1">
        </div>
    </div>

    <!-- Use the communities id and avg price as the key to ensure it updates on changes -->
    <div v-for="community in communities" :key="community.id+community.avgPrice" class="communityRow">
        <div class="row center-xs middle-xs fullWidth ">
            <div class="col-xs-12 col-md-6 col-lg-3 column">
                <div v-if="community.imgUrl">
                    <img :src="community.imgUrl" alt="Community Image">
                </div>
            </div>

            <div class="col-xs-12 col-md-6 col-lg-3 column start-lg">
                {{community.name}}
            </div>

            <div class="col-xs-12 col-md-6 col-lg-3 column start-lg">
                {{community.group}}
            </div>

            <div class="col-xs-12 col-md-6 col-lg-2 column start-lg">
                {{community.avgPrice ? community.avgPrice : "Loading"}}
            </div>

            <div class="col-xs-12 col-md-6 col-lg-1 column">
                <div v-if="community.homes">
                    <button v-if="!community.showDetails" type="button" class="uk-button-primary" @click="toggleHomeDetails(community)">
                        Show Homes
                    </button>
                    <button v-else type="button" class="uk-button-primary" @click="toggleHomeDetails(community)">
                        Hide Homes
                    </button>
                </div>
            </div>
        </div>

        <div v-if="community.showDetails && community.homes" class="row center-xs fullWidth">
            <div class="col-xs-12 col-lg-9">
            </div>

            <div class="col-xs column start-lg">
                <h2>Community Homes</h2>
                <div v-for="(home, index) in community.homes" :key="home.id" class="row fullWidth">
                    {{index+1}}: {{home.type}} - {{home.area}} sqft - {{toDisplayNum(home.price)}}
                </div>
            </div>

        </div>
    </div>
</div>
</template>

<script>
export default {
    props: ['communities', 'homes'],
    methods: {
        toggleHomeDetails(community) {
            community.showDetails = !community.showDetails
            this.$forceUpdate()
        },

        toDisplayNum(num) {
            return '$'+ Number(num).toLocaleString()
        },

        sum(list, key) {
            let sum = 0
            for (let item of list)
                sum += item[key]
            return sum
        }
    },
    mounted: function() {
        // On mount, we both the response to both requests
        // Itterate over all communities
        for (let community of this.communities) {
            // Ensure the object has an id attribute
            if (community.id != undefined) {
                // Create a list of all homes with a communityId that matches the current community
                let communityHomes = this.homes.filter(home => home.id != undefined && home.communityId == community.id)

                // Will fail on any falsy value (i.e. length == undefined or length == 0)
                if (communityHomes.length) {
                    // Store the filter list in the community object to display ot suer
                    community.homes = communityHomes

                    let avg = this.sum(communityHomes, 'price') / communityHomes.length

                    if (avg) {
                        community.avgPrice = this.toDisplayNum(avg)
                    } else {
                        console.error("Could not calculate average price for: ", community);
                        community.avgPrice = "N/A"
                    }
                } else {
                    console.log('No Homes found for: ', community);
                    community.avgPrice = "N/A"
                }

            }
        }

        this.$forceUpdate()
    },
}
</script>

<style scoped>
    .headerRow {
        font-family: 'Oswald', sans-serif;
        font-weight: 500;
        font-size: 32px;
        color: black;

        padding: 20px 0;
        background-color: white;
    }

    .communityRow, button, h1, h2, h3, h4, h5, h6 {
         font-family: 'Open Sans', sans-serif;
     }

    .communityRow {
        font-size: 22px;
        color: black;

        border-top: 1px solid #e5e5e5;
    }

    .column {
        padding: 20px 0;
    }

    .communityRow:nth-child(odd) {
        background-color: rgba(200, 200, 200, 0.25);
    }

    .communityRow:hover {
        background-color: rgb(250, 250, 230);
    }

    img {
        height: 100px;
        width: auto;
    }

    button {
        font-weight: 400px;
        font-size: 15px;

        border-radius: 10px;
        padding: 7.5px 5px;

        cursor: pointer;
        outline: none;
    }
</style>
