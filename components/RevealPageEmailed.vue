<template>
  <div>
  <!-- <transition name="fade2" appear -->
    <!-- <div v-if="loading" class="loader">
      <Loader />
    </div> -->

    <div class="revealContainer" id="revealContainer" :style="{ backgroundImage: `url('${revealPage.profileImage}')` }" :title="revealPage.altText">
      <div style="z-index: 100; margin-top: 10vh; height: 100px; position: relative;">
        <v-row xs12>
          <v-flex xs12 class="mt-n10 ml-6">
            <div style="font-size: 36px; width: 100%; text-align: left; text-shadow: 2px 2px 4px dimgray; ">
              <img :src="revealData.cohort.logo ? revealData.cohort.logo : require('@/assets/images/TheKindQuiz-Yellow.svg')" class="kindQuizYellow" />
            </div>
          </v-flex>
        </v-row>
      </div>
      <div style="z-index: 100; margin-top: 17vh; position: relative;">
        <v-row xs12>
          <v-flex xs12 class="mb-n4" style="color: white;">
            <div class="text-xs-center" style="font-size: 36px; width: 100%; text-align: center; text-shadow: 2px 2px 4px dimgray; ">
              Your Kind profile is
            </div>
          </v-flex>
        </v-row>
        <v-row xs12>
          <v-flex xs12 style="color: white;">
            <div class="text-xs-center mt-4" style="font-size: 36px; width: 100%; text-align: center; text-shadow: 2px 2px 4px dimgray; ">
              {{ profile.name }}
            </div>
          </v-flex>
        </v-row>
      </div>
      <div style="z-index: 100; margin-top: 14vh; position: relative;">
        <v-row>
          <v-flex xs1></v-flex>
          <v-flex xs10 style="color: white;">
            <div class="text-xs-center mb-3 ml-2 mr-2" style="font-size: 18px; font-weight: 500; width: 100%; text-align: center; text-shadow: 2px 2px 4px dimgray; ">
              Check out your kindness traits, celebrities who share your Kind profile, and how to compare with your friends.
            </div>
          </v-flex>
          <v-flex xs1></v-flex>
        </v-row>
        <v-row>
          <v-flex xs12 style="color: white;">
            <div @click="scrollDown" class="text-xs-center scolldown-icon-cont">
              <ScrollDownIcon />
            </div>
          </v-flex>
        </v-row>
        <div class="mainContainer" id="mainContainer">
          <!-- <v-app-bar
            app
            class="primary"
            style="z-index: 2000; height: 12vh; max-height: 100px; padding: 0px; position: sticky"
          >
            <div
                  v-if="mobile"
                  style="
                    display: flex; 
                    flex-direction: row; 
                    justify-content: center; 
                    width: 100%;
                    margin: 0px 0px 0px -10px;              
                    ">
                <div style="height: 12vh; margin-top: 4vh; display: flex; flex-direction: column; justify-content: center;">
                    <div>
                    <img  :src="require('@/assets/images/TheKindQuiz-White.svg')" class="kindQuizWhite"/>
                    </div>
                </div>
            </div>
            <div v-else style="
                    display: flex; 
                    flex-direction: row; 
                    justify-content: space-between; 
                    width: 100%;
                    margin: 0px 0px 0px -10px;              
                    ">
                <div style="height: 12vh;  max-height: 100px; margin: 4vh 0px 0px 20px; display: flex; flex-direction: column; justify-content: center;">
                    <div style="    display: inline-block;
          vertical-align: middle;">
                    <img  :src="require('@/assets/images/TheKindQuiz-White.svg')" class="kindQuizWhite" style="min-height: 20px;" />
                  </div>
                </div>
                <div style="height: 12vh; margin-top: 3.3vh; display: flex; flex-direction: column; justify-content: center;">
                <div style="width: 40vw; text-align: right; color: white; font-weight: 600; font-size: 18px; -webkit-font-smoothing: antialiased;">   {{ profile.firstName }} is {{ profileType }} with a kindness that is {{ wordsForAppBar }}</div>
                </div>
            </div>
          </v-app-bar>  -->
          <v-app-bar app sticky class="primary" style="height: 100px; width: 100vw; padding: 0px; position: sticky">
            <div v-if="mobile" 
              style="
                display: flex; 
                flex-direction: row; 
                justify-content: center; 
                width: 100%;
                height: 100px;
                margin: 43px 0px 0px 0px;"
            >
              <div style="height: 100px; display: flex; flex-direction: column; justify-content: center;">
                <div>
                  <img :src="revealData.cohort.logo ? revealData.cohort.logo : require('@/assets/images/TheKindQuiz-White.svg')" class="kindQuizWhite" />
                </div>
              </div>
            </div>
            <div v-else style="
              display: flex; 
              flex-direction: row; 
              justify-content: space-between; 
              width: 100%;
              margin: 42px 0px 0px 0px;
              padding: 0px 70px 0px 60px;              
              ">
              <div style="height: 100px; display: flex; flex-direction: column; justify-content: center;">
                <div>
                  <img :src="revealData.cohort.logo ? revealData.cohort.logo : require('@/assets/images/TheKindQuiz-White.svg')" class="kindQuizWhite" />
                </div>
              </div>
              <div style="height: 100px; width: 50%; display: flex; flex-direction: column; justify-content: center;">
                <div style="text-align: right; color: white; font-weight: 600;  font-size: 18px; -webkit-font-smoothing: antialiased;"> {{ profile.firstName }} is {{ profile.name }} with a kindness that is {{ wordsForAppBar }}</div>
              </div>
              <!-- 
              <div style="height: 12vh;  max-height: 100px; margin: 4vh 0px 0px 20px; display: flex; flex-direction: column; justify-content: center;">
                  <div style="    display: inline-block;
          vertical-align: middle;">
                    <img  :src="require('@/assets/images/TheKindQuiz-White.svg')" class="kindQuizWhite" style="min-height: 20px;" />
                  </div>
                  </div>
                  <div style="height: 12vh; margin-top: 3.3vh; display: flex; flex-direction: column; justify-content: center;  width: 40%;">
                  <div style="text-align: right; color: white; font-weight: 600; font-size: 18px; -webkit-font-smoothing: antialiased;">   {{ profile.firstName }} is {{ profile.name }} with a kindness that is {{ wordsForAppBar }}</div>
                </div> 
                -->
            </div>
          </v-app-bar>


          <div style="height: 40px; "></div>


          <div class="headerIndent">
            <v-row>
              <v-flex class="headerIdent-title ml-1 mb-10 mt-8">
                Your Kind Profile
              </v-flex>
            </v-row>
          </div>
          <v-row justify-center>
            <v-flex xs1>
            </v-flex>
            <v-flex xs10>
              <div style="position: relative; text-align: center; color: white; margin: 0px 0px 20px 0px">
                <img :src="this.revealPage.seoImage" class="profileImageSecondary" />
                <!-- <div class="secondaryImageType" style="position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%);">
                  {{ profile.name }}
                </div> -->
              </div>
            </v-flex>
            <v-flex xs1>
            </v-flex>
          </v-row>
          <div v-if="mobile">
            <v-row justify-center>
              <v-flex xs1>
              </v-flex>
              <v-flex xs10>
                <div class="headline headerIndent-headline">
                  <!-- {{ profile.name }} -->
                  <span style="font-weight: bold">{{ profile.name }}:</span> {{ revealPage.captionOne }}
                </div>
              </v-flex>
              <v-flex xs1>
              </v-flex>
            </v-row>
          </div>
          <div v-if="!mobile" style="width: 100%; padding-left: 26%; padding-right: 25%">
            <v-row justify-center>
              <v-flex xs1>
              </v-flex>
              <v-flex xs10>
                <div class="headline headerIndent-headline print-wrap page1">
                  <!-- {{ profile.name }} -->
                  <span style="font-weight: bold">{{ profile.name }}:</span> {{ revealPage.captionOne }}
                </div>
              </v-flex>
              <v-flex xs1>
              </v-flex>
            </v-row>
          </div>
          <section>
            <!-- {{ distanceToTop }} -->
            <div style="height: 40px; "></div>
          </section>
          <div class="headerIndent">
            <v-row>
              <v-flex class="headerIdent-title ml-1 mb-3 mt-8">
                Your Kindness is
              </v-flex>
            </v-row>
          </div>
          <!-- CAROUSEL -->
          <section v-if="mobile">
            <v-carousel :show-arrows="false" :hide-delimiter-background="true" light height="300px">
              <v-carousel-item v-for="(aspect, i) in kindnessWordsListFiltered" :key="i">
                <v-row style="margin-top: 50px" align="center" justify="center">
                  <div style="display: flex; flex-direction: column; justify-content: center; ">
                    <div style="display: flex; flex-direction: column; justify-content: center; height: 200px; width: 200px; border-radius: 50%;; overflow: hidden; background-color: #ffc71a">
                      <transition name="fade" appear>
                        <img :src="aspect.image" style="height: 200px; object-fit: cover;" />
                      </transition>
                    </div>
                    <div style="display: flex; flex-direction: column; justify-content: center; height: 200px; width: 200px; margin-top: -200px; text-shadow: 2px 2px 4px dimgray; color: white; text-align: center; font-weight: 500; font-size: 20px;">
                      {{ aspect.title }}
                    </div>
                  </div>
                </v-row>
              </v-carousel-item>
            </v-carousel>
          </section>
          <section v-if="!mobile">
            <v-row style="margin-left: 8.4%; margin-top: 30px; margin-right: 8.4%" class="fill-height" align="center" justify="center">
              <!-- <v-flex xs1></v-flex> -->
              <v-flex>
                <div style=" justify-content: center; flex-direction: row; display: flex; width: 100%">
                  <div style="position: relative; text-align: center; color: white; margin-right: 3.3%;" v-for="(aspect, i) in kindnessWordsListFiltered" :key="i">
                    <div style="display: flex; flex-direction: column; justify-content: center; height: 150px; width: 150px; border-radius: 50%;; overflow: hidden; background-color: #ffc71a">
                      <img :src="aspect.image" style="min-height: 150px; object-fit: cover;" />
                    </div>
                    <div style="display: flex; flex-direction: column; justify-content: center; height: 150px; width: 150px; margin-top: -150px; text-shadow: 2px 2px 4px dimgray; font-size: 20px; font-weight: 500;">
                      {{ aspect.title }}
                    </div>
                    <!-- <div class="primary headline" style="text-align: center; line-height: 150px; border-radius: 50%; width: 150px; height: 150px;">{{ aspect.title }}</div> -->
                  </div>
                </div>
              </v-flex>
            </v-row>
          </section>
          <!-- OVERVIEW -->
          <div style="height: 40px; "></div>
          <!-- OVERVIEW SUBCOMPONENTS -->
          <section v-if="mobile">
            <div class="headerIndent">
              <v-row>
                <v-flex class="headerIdent-title ml-1 mb-3 mt-8">
                  Overview
                </v-flex>
              </v-row>
            </div>
            <v-row justify-center>
              <v-flex xs1></v-flex>
              <v-flex xs10>
                <div class="headline headerIndent-headline">
                  <!-- {{ profile.name }} -->
                  <span style="font-weight: bold">Your Kind profile</span>
                  reflects your dominant
                  traits, core attributes, and personal inclinations.
                  This unique blend of social values and engagement preferences combine to reveal your unique kindness:
                </div>
              </v-flex>
              <v-flex xs1></v-flex>
            </v-row>
            <span v-for="(aspect, i) in revealPage.overview" :key="i">
              <v-row>
                <v-flex xs12 class="ml-1 mb-3 mt-8" style="font-size: 32px; font-weight: 500; color: black; text-align: center;">
                  {{ aspect.title }}
                </v-flex>
              </v-row>
              <v-row justify-center>
                <v-flex xs1></v-flex>
                <v-flex xs10>
                  <div class="headline headerIndent-headline">
                    {{ aspect.description }}
                  </div>
                </v-flex>
                <v-flex xs1></v-flex>
              </v-row>
            </span>
          </section>
          <section v-if="!mobile">
            <div class="headerIndent">
              <v-row>
                <v-flex class="headerIdent-title mb-3 mt-8">
                  Overview
                </v-flex>
              </v-row>
              <div style="height: 20px;"></div>
              <v-row justify-center>
                <v-flex xs1></v-flex>
                <v-flex xs10>
                  <div class="headline headerIndent-headline">
                    <!-- {{ profile.name }} -->
                    <span style="font-weight: bold">Your Kind profile</span>
                    reflects your dominant
                    traits, core attributes, and personal inclinations.
                    This unique blend of social values and engagement preferences combine to reveal your unique kindness:
                  </div>
                </v-flex>
              </v-row>
            </div>
            <div style="height: 40px;"></div>
            <div style="width: 100%; padding-left: 14%; padding-right: 14%;">
              <v-row cols="12">
                <v-col v-for="(aspect, i) in revealPage.overview" :key="i" xs="4" md="4" class="mb-3 mt-8 headline" style=" color: black; text-align: center; font-weight: bold">
                  {{ aspect.title }}
                  <div style="margin: 10px 0 0 0; position: relative; text-align: left; color: black; font-weight: 400; font-size: 22px; text-align: center">
                    {{ aspect.description }}
                  </div>
                </v-col>
              </v-row>
            </div>
          </section>
          <!-- END OF OVERVIEW AND OVERVIEW SUBCOMPONENTS -->
          <!-- TOP TRAITS FOR TYPE -->
          <div class="headerIndent">
            <v-row>
              <v-flex xs12 class="headerIdent-title ml-1 mb-6 mt-8">
                Top {{ profile.name }} traits
              </v-flex>
            </v-row>
          </div>
          <div v-if="!mobile" style="width: 100vw; margin-top: 20px; padding: 0px 14% 0px 14%" ref="capture">
            <v-row>
              <v-flex xs12 md6 lg4 style-="padding: 24px;" v-for="(element, i) in profile.topTraits" :key="i">
                <div style="font-size: 20px; padding: 23px; width: 90%; border-radius: 16px; border: 1.5px solid #FFC719; margin-bottom: 24px">
                  <div style="margin: 0px 0px 10px 0px; width: 100%; text-align: center; font-weight: bold; " class="headline">
                    {{ element.title }}
                  </div>
                  {{ element.description }}
                </div>
              </v-flex>
            </v-row>
          </div>
          <div v-if="mobile" style="width: 100vw; border: display: flex; flex-direction: column; justify-content: flex-start;">
            <div v-for="(element, i) in profile.topTraits" :key="i" style="display: flex; flex-direction: row; justify-content: center; width: 100%;">
              <div style="font-size: 22px; padding: 23px; width: 88%; border-radius: 16px; border: 1.5px solid #FFC719; margin-bottom: 24px">
                <div style="margin: 0px 0px 10px 0px; width: 100%; text-align: center; font-weight: bold; " class="headline">
                  {{ element.title }}
                </div>
                {{ element.description }}
              </div>
            </div>
          </div>

          <div style="height: 20px"></div>
          




          <!-- CoLab Kindness -->
          <div class="headerIndent" v-if="cohortSetting.showCoLab">
            <v-row>
              <v-flex xs10 class="headerIdent-title ml-1 mb-6 mt-8">
                Kick-start your kindness
              </v-flex>
              <v-flex xs2>
              </v-flex>
            </v-row>
            <v-row justify-center class="mb-8">
              <v-flex xs1></v-flex>
              <v-flex xs10>
                <div class="headerIndent-headline headline">
                  The Kind CoLab is a global community designed to
                  engage, educate, and empower individuals who seek to
                  discover and activate their unique profiles through
                  curated content, activities & events.
                </div>

                <div class="mt-5 headerIndent-headline headline text-center">
                  <span style="font-weight: bold">Kindness thrives in community.</span>
                </div>

                <a href="https://www.kindcolab.ai/" class="mt-5 check-kindcolab-link text-right primary--text">
                  <span class="mr-1 hidden-xs">Check out the</span>
                  <div style="flex-direction: row; align-items: center; display: flex;">
                    <img :src="require('@/assets/images/KindCoLab-TM-Yellow.svg')" />
                    <v-icon color="primary">mdi-chevron-right</v-icon>
                  </div>
                </a>
              </v-flex>
            </v-row>
          </div>





          <div style="height: 20px"></div>




          <!-- FAMOUS PERSONAE -->
          <div class="headerIndent">
            <v-row>
              <v-flex xs10 class="headerIdent-title ml-1 mb-6 mt-8">
                Famous {{ profile.name }} people
              </v-flex>
              <v-flex xs2>
              </v-flex>
            </v-row>
            <v-row justify-center class="mb-8">
              <v-flex xs1></v-flex>
              <v-flex xs10>
                <div class="headerIndent-headline headline">

                  <span style="font-weight: bold">With your {{ profile.name }} profile,</span>
                  you stand in good company with these influential people. Your kindness closely aligns with:
                </div>
              </v-flex>
            </v-row>
          </div>
          <div style="height: 25px"></div>
          <section v-if="mobile">
            <span class="mt-8" v-for="(aspect, i) in revealPage.famousPeople" :key="i + 'famous'">
              <!-- <v-row>
                <v-flex xs12 class="ml-1 mb-3 mt-8" style="font-size: 32px; font-weight: 500; color: black; text-align: center;">
                  {{ aspect.title }}
                </v-flex>
              </v-row> -->
              <v-row justify-center>
                <v-flex xs12 class="pb-2 pt-2">
                  <div style=" justify-content: center; flex-direction: row; display: flex; width: 100%">
                    <div style="position: relative; text-align: center; color: white; margin-right: 3.3%;">
                      <div class="primary headline" style="text-align: center; line-height: 190px; border-radius: 50%; width: 190px; height: 190px; overflow: hidden;">
                        <img :src="aspect.image" style="height: 190px" />
                      </div>
                    </div>
                  </div>
                </v-flex>
              </v-row>
              <v-row justify-center class=" headline pb-2 pt-2 ml-8 mr-10">
                <v-flex xs11>
                  <div style="width: 100%; text-align: center; margin: 0px 20px 0px 10px">
                    <span v-html="aspect.name"> {{ aspect.name }} </span> <span v-html="$options.filters.removebackSpash(aspect.description)"></span>
                  </div>
                </v-flex>
                <v-flex xs1></v-flex>
              </v-row>
            </span>
          </section>
          <section v-if="!mobile">
            <div style="padding-left: 10%; padding-right: 10%" ref="famous">
              <span v-for="(aspect, i) in revealPage.famousPeople" :key="i + 'famousDesktop'">
                <!-- <v-row>
                  <v-flex xs12 class="ml-1 mb-3 mt-8" style="font-size: 32px; font-weight: 500; color: black; text-align: center;">
                    {{ aspect.title }}
                  </v-flex>
                </v-row> -->
                <v-row justify-center v-if="(i + 1) % 2 !== 0">
                  <v-flex xs4 class="pb-2 pt-2">
                    <div style=" justify-content: center; flex-direction: row; display: flex; width: 100%">
                      <div style="position: relative; text-align: center; color: white; margin-right: 3.3%;">
                        <div class="primary headline" style="margin-right: -30px; line-height: 160px; border-radius: 50%; width: 160px; height: 160px; overflow: hidden;">
                          <img :src="aspect.image" style="height: 160px" />
                        </div>
                      </div>
                    </div>
                  </v-flex>
                  <v-flex xs7>
                    <div style="width: 100%; height: 100%; display: flex; flex-direction: column; justify-content: center; line-height: 30px; text-align: left; margin: 0px 0px 0px 0px; font-size: 22px;">
                      <div>
                        <span v-html="aspect.name"></span> <span v-html="$options.filters.removebackSpash(aspect.description)"></span>
                      </div>
                    </div>
                  </v-flex>
                  <v-flex xs1></v-flex>
                </v-row>
                <v-row justify-center v-if="(i + 1) % 2 === 0">
                  <v-flex xs1></v-flex>
                  <v-flex xs7>
                    <div style="width: 100%; height: 100%; display: flex; flex-direction: column; justify-content: center; line-height: 30px; text-align: left; margin: 0px 20px 0px 10px; font-size: 22px">
                      <div>
                        <span v-html="aspect.name"> </span> <span v-html="$options.filters.removebackSpash(aspect.description)"></span>
                      </div>
                    </div>
                  </v-flex>
                  <v-flex xs4 class="pb-2 pt-2">
                    <div style=" justify-content: center; flex-direction: row; display: flex; width: 100%">
                      <div style="position: relative; text-align: center; color: white; margin-right: 3.3%;">
                        <div class="primary headline" style="margin-left: -15px; text-align: center; line-height: 160px; border-radius: 50%; width: 160px; height: 160px; overflow: hidden;">
                          <img :src="aspect.image" style="height: 160px" />
                        </div>
                      </div>
                    </div>
                  </v-flex>
                </v-row>
              </span>
            </div>
          </section>





          <!-- OVERVIEW -->
          <!-- <div style="width: 100vw">
            <v-row class="ml-1 mb-3 mt-8">
              <v-flex xs1>
              </v-flex>
              <v-flex  style="font-size: 32px; font-weight: 500; color: #474747">
                Causes you care about most
              </v-flex>
            </v-row>
          </div> -->
          <section v-if="mobile">
            <v-row>
              <v-flex xs1></v-flex>
              <v-flex xs10 class="headerIdent-title ml-1 mb-6 mt-8">
                Causes you care about most
              </v-flex>
              <v-flex xs1></v-flex>
            </v-row>
            <v-row justify-center>
              <v-flex xs1></v-flex>
              <v-flex xs10>
                <div class="headline headerIndent-headline">
                  Here are the
                  <span style="font-weight: bold">specific causes</span>
                  that stir your heart and motivate you to take action:
                </div>
              </v-flex>
              <v-flex xs1></v-flex>
            </v-row>
          </section>
          <!-- DESKTOP CAUSES HEADER -->
          <section v-if="!mobile">
            <div class="headerIndent">
              <v-row>
                <v-flex xs10 class="headerIdent-title ml-1 mb-6 mt-8">
                  Causes you care about most
                </v-flex>
                <v-flex xs2>
                </v-flex>
              </v-row>
              <v-row justify-center>
                <v-flex xs1></v-flex>
                <v-flex xs10>
                  <div class="headline headerIndent-headline">
                    Here are the
                    <span style="font-weight: bold">specific causes</span>
                    that stir your heart and motivate you to take action:
                  </div>
                </v-flex>
                <v-flex xs1></v-flex>
              </v-row>
            </div>
          </section>
          <div v-if="mobile" style="width: 100%; text-align: center; margin: 50px 0px 0px 0px; display: flex; flex-direction: row; justify-content: center">
            <div style="width: 310px;">
              <v-row cols="12">
                <v-col xs="5" md="3" v-for="(cause, i) in profile.causes" :key="i + 'causes'">
                  <div class="primary" style="border-radius: 50%; width: 140px; height: 140px; overflow: hidden">
                    <img :src="require(`@/assets/images/causes/${cause}.jpg`)" style="height: 140px" />
                    <div style="display: flex; flex-direction: column; justify-content: center; height: 140px; margin-top: -150px; color: white; text-shadow: 2px 2px 4px dimgray; font-size: 20px">
                      <div>{{ cause }}</div>
                    </div>
                  </div>
                </v-col>
              </v-row>
            </div>
          </div>
          <div v-if="!mobile" style="width: 100%; text-align: center; margin: 50px 0px 0px 0px; display: flex; flex-direction: row; justify-content: center" ref="causes">
            <div style="width: 65%;">
              <v-row cols="12">
                <v-col xs="5" md="3" v-for="(cause, i) in profile.causes" :key="i + 'causes'">
                  <div class="primary" style="border-radius: 50%; width: 150px; height: 150px; overflow: hidden">
                    <img :src="require(`@/assets/images/causes/${cause}.jpg`)" style="height: 150px" />
                    <div style="display: flex; flex-direction: column; justify-content: center; height: 150px; margin-top: -162px; color: white; text-shadow: 2px 2px 4px dimgray; font-size: 22px">
                      <div>{{ cause }}</div>
                    </div>
                  </div>
                </v-col>
              </v-row>
            </div>
          </div>
          <!-- ADD SOME WHITESPACE AT BOTTOM -->
          <div style="height: 8vh"></div>




          <!-- Cources Section -->
          <section v-if="mobile && resources.length > 0">
            <v-row>
              <v-flex xs1></v-flex>
              <v-flex xs10 class="ml-1 mb-6 mt-8" style="font-size: 32px; font-weight: 500; color: #474747">
                Just for you {{profile.firstName}}
              </v-flex>
              <v-flex xs1></v-flex>
            </v-row>
            <v-row justify-center>
              <v-flex xs1></v-flex>
              <v-flex xs10>
                <div class="headline headerIndent-headline">
                  With your {{profile.name}} profile,
                  these are the social impact activities
                  that most resonate with your values
                  and engagement preferences. Click on
                  one to see how you can instantly
                  engage!
                </div>
              </v-flex>
              <v-flex xs1></v-flex>
            </v-row>
          </section>
          <!-- DESKTOP CAUSES HEADER -->
          <section v-if="!mobile && resources.length > 0">
            <div class="headerIndent">
              <v-row>
                <v-flex xs10 class="headerIdent-title ml-1 mb-6 mt-8">
                  Just for you {{profile.firstName}}
                </v-flex>
                <v-flex xs2>
                </v-flex>
              </v-row>
              <v-row justify-center>
                <v-flex xs1></v-flex>
                <v-flex xs10>
                  <div class="headline headerIndent-headline">
                    With your {{profile.name}} profile,
                    these are the social impact activities
                    that most resonate with your values
                    and engagement preferences. Click on
                    one to see how you can instantly
                    engage!
                  </div>
                </v-flex>
                <v-flex xs1></v-flex>
              </v-row>
            </div>
          </section>
          <div v-if="mobile" style="width: 100%; text-align: center; margin: 50px 0px 0px 0px; display: flex; flex-direction: row; justify-content: center">
            <div style="width: 70%;">
              <v-row cols="12" v-for="(resource, index) in resources" :key="index + 'resources'" class="mb-2">
                <div class="d-flex justify-center" style="width: 100%">
                  <img :src="resource.photoUrl" style="height: 140px" />
                </div>
                <ClientOnly>
                  <div class="headline resource-desc" :data-res-id="resource.id" style="text-align: left" v-html="resource.description"></div>
                </ClientOnly>
              </v-row>
            </div>
          </div>

          <div v-if="!mobile" style="width: 100%; text-align: center; margin: 50px 0px 0px 0px; display: flex; flex-direction: row; justify-content: center" ref="causes">
            <div style="width: 70%;">
              <v-row cols="12" v-for="(resource, index) in resources" :key="index + 'resources'" class="mb-3">
                <v-flex xs3 class="d-flex align-center">
                  <img :src="resource.photoUrl" style="max-width: 200px; width: 100%" />
                </v-flex>
                <v-flex xs1>
                </v-flex>
                <v-flex xs7 class="d-flex align-center">
                  <ClientOnly>
                    <div class="headline resource-desc" :data-res-id="resource.id" style="text-align: left" v-html="resource.description"></div>
                  </ClientOnly>
                </v-flex>
              </v-row>
            </div>
          </div>
          <!-- ADD SOME WHITESPACE AT BOTTOM -->
          <div style="height: 8vh"></div>
          <!-- Courses Section End -->
        </div>







        <div style="height: 100vh; display: flex; align-items: center">
          <div style="z-index: 100; width: 100%; position: relative;">

            <div style="z-index: 100; margin-top: 17vh; position: relative;">
              <v-row xs12>
                <v-flex xs12 class="mb-n4" style="color: white;">
                  <div class="text-xs-center" style="font-size: 36px; width: 100%; text-align: center; text-shadow: 2px 2px 4px dimgray; ">
                    Your Kind profile is
                  </div>
                </v-flex>
              </v-row>
              <v-row xs12>
                <v-flex xs12 style="color: white;">
                  <div class="text-xs-center mt-4" style="font-size: 36px; width: 100%; text-align: center; text-shadow: 2px 2px 4px dimgray; ">
                    {{ profile.name }}
                  </div>
                </v-flex>
              </v-row>
            </div>



            <fragment  v-if="!cohortSetting.showCoLab">
              <v-row cols="12" class="mt-5">
                <v-col xs="12" style="color: white;">
                  <div class="text-xs-center profileTitle" style="text-transform: uppercase;">
                    Share &amp; Compare
                  </div>
                </v-col>
              </v-row>
              <v-row cols="12">
                <v-col xs="12" style="color: white; margin-left: 0px">
                  <div style="display: flex; flex-direction: row; justify-content: center; width: 100%;">
                    <KQSocialSharing
                      :profile="profile"
                      :cohortSetting="cohortSetting"
                    />
                  </div>
                </v-col>
              </v-row>
            </fragment>


            <v-row cols="12" v-if="cohortSetting.showCoLab" class="mt-5">
              <v-col xs="12" md="6">
                <v-rows cols="12">
                  <v-col xs="12" style="color: white;">
                    <div class="text-center profileTitle colab" style=" ">
                      Share &amp; Compare
                    </div>
                  </v-col>
                  <v-col xs="12" style="color: white; margin-left: 0px">
                    <div style="display: flex; flex-direction: row; justify-content: center; width: 100%;">
                      <KQSocialSharing
                        :profile="profile"
                        :cohortSetting="cohortSetting"
                      />
                    </div>
                  </v-col>
                </v-rows>
              </v-col>

              <v-col xs="12" md="6">
                <v-rows cols="12">
                  <v-col xs="12" style="color: white;">
                    <div class="text-xs-center profileTitle colab">
                      Join the community
                    </div>
                  </v-col>
                  <v-col xs="12" class="text-center">
                    <a href="https://www.kindcolab.ai/" class="colab-join-community">
                      <strong>Kind CoLab</strong><sup>TM</sup>
                    </a>
                  </v-col>
                </v-rows>
              </v-col>
            </v-row>

            <!-- <v-row>
              <v-col>
                <div style="display: flex; flex-direction: row; justify-content: center; width: 100%;">
                  <div v-if="!generatingPDF" @click="downloadVisualReport" style="margin: -77px 0px 0px 150px;"><img :src="require('@/assets/images/pdf.svg')" style="height: 45px;" /> </div>
                  <div v-if="generatingPDF" style="margin: -77px 0px 0px 150px; height: 45px; width: 45px; border-radius: 50%; background-color: #ffc71a;"> </div>
                </div>
              </v-col>
            </v-row> -->
          </div>
          <div style="color: white; position: absolute; bottom: 10px; width: 100%;">
            <div style="display: flex; flex-direction: row; justify-content: center; text-shadow: 2px 2px 4px dimgray">
              <div style="text-align: center;">
                {{ new Date().getYear() + 1900 }} @ Summery, Inc. All rights reserved. | &nbsp;<a target="_blank" style="margin: 0px 4px 0px 3px; color: white; text-decoration: none;" href="https://summery.ai/ethical-data-privacy"> Privacy policy</a> | <a target="_blank" style="margin: 0px 4px 0px 3px; color: white; text-decoration: none;" href="https://summery.ai"><span ref="powered"><img :src="require('@/assets/images/poweredBy.svg')" style="height: 22px; margin-bottom: -7px;" /> </span></a>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div style="color: black">
        <!-- {{ profile.name }} <br />
          {{ revealPage.captionOne }}<br /> -->
                  <!-- 
          <div v-for="(celeb, index) in revealPage.famousPeople" :key="index + 'captureCeleb'">

          <span v-html="celeb.name + celeb.description"></span>

        </div> -->
      </div>
    </div>
  </div>
</template>
<script>

import _ from 'lodash'


import Loader from './Loader'
import ScrollDownIcon from './ScrollDownIcon'
import KQSocialSharing from './KQSocialSharing'

export default {
  beforeMount() {
  },
  created() {
    if (process.browser) {
      const MailtoUI = require('mailtoui/dist/mailtoui-min.js')

      MailtoUI.run()

      this.mobile = window.innerWidth < 894 ? true : false
      addEventListener('resize', () => {
        this.mobile = window.innerWidth < 894 ? true : false
      })
    } else {
    }
    this.loadData()
  },
  mounted () {
    const self = this

    setTimeout(() => {
      const jQuery = require('jquery')
      window.$ = jQuery

      const resourceDescs = jQuery('.resource-desc')
      resourceDescs.each((rId, r) => {
        jQuery(r).find('a').each((eId, ele) => {
          jQuery(ele).click((ev) => {
            ev.preventDefault()
            console.log(ev.target.href)

            this.$axios.post('/engagementCounts', {
              cohortLabel: self.profile.cohortLabel,
              profileId: self.profile.id,
              resourceId: +jQuery(r).attr('data-res-id')
            })


            this.$ga.event({
              eventCategory: this.cohortLabel,
              eventAction: `resourceClicked`,
              eventLabel: `${ev.target.href}`,
              eventValue: +jQuery(r).attr('data-res-id')
            })

            const win = window.open(ev.target.href, '_blank');
            win.focus();
          })
        })
      })
    }, 100)



    this.$ga.event({
      eventCategory: this.cohortLabel,
      eventAction: `visitProfile`,
      eventLabel: `Name: ${this.profile.firstName} Type: ${this.profile.name} Id: ${this.id}`,
      eventValue: 1
    })
  },
  components: {
    Loader,
    ScrollDownIcon,
    KQSocialSharing
  },
  methods: {
    getImgFromUrl(logoUrl, callback) {
      this.img = new Image()
      this.img.src = logoUrl
      this.img.onload = () => {
        callback(this.img)
      }
    },
    showCaptureRef(ref) {
      console.log("this.$refs.capture: " + ref);
      // let vc = this;
      return ref;
    },

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
    },
    scrollDown() {
      const smoothscroll = require('smoothscroll-polyfill')
      smoothscroll.polyfill()
      var mainContainer = document.getElementById('mainContainer')
      mainContainer.scrollIntoView({ behavior: 'smooth', block: 'start' })
    },
    loadData() {
      this.id = this.pageData.id
      this.cohort = this.pageData.cohort
      this.profile = this.pageData.profile
      this.revealPage = this.pageData.revealPage
      this.revealData = this.pageData.revealData
      try {
        const resources = []
        // Combind resources and sort
        const groupedRes = _.groupBy(this.profile.matchedResources, 'resource.resourceType')
        this.profile.survey.resourceTypes.forEach(type => {
          if (groupedRes[type] && Array.isArray(groupedRes[type]) && groupedRes[type][0].resource) {
            resources.push(groupedRes[type][0].resource)
          }
        })

        this.resources = resources
      } catch(err) {
        console.log(err)
      }
    },
  },
  computed: {
    cohortSetting() {
      if (this.revealData && this.revealData.cohort
         && this.revealData.cohort.settings) {
        return this.revealData.cohort.settings
      } else {
        return {}
      }
    },
    wordsForAppBar() {
      var delimiter = ', ';
      var list = this.kindnessWordsListFiltered.map(a => a.title).join(delimiter)
      var index = list.lastIndexOf(delimiter);
      return list.substring(0, index) + ' & ' + list.substring(index + delimiter.length) + '.'
      // return list
      // console.log(list)
      // kindnessWordsListFiltered.map(a => a.title).join(', ')
    },
    kindnessWordsListFiltered() {
      let list = []
      if (this.revealPage.kindnessWordsList) {
        list = this.revealPage.kindnessWordsList.filter((word) => {
          if (word.title !== '') {
            return word.title
          }
        })
      }
      return list
    }
  },
  props: {
    pageData: Object
  },
  data() {
    return {
      generatingPDF: false,
      href: 'mailto:tony.stark@example.com',

      loading: false,
      
      
      distanceToTop: 0,
      mobile: true,
      img: null,

      resources: [],
      profile: null,
      revealData: null,
      revealPage: null,

    }
  }
}
</script>
<style lang="scss">
.loader {
  width:100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  background-color: #d2dfe6;
  color: white;

  align-items: center;
}

.scolldown-icon-cont {
  font-size: 18px;
  font-weight: 500;
  font-style: italic;
  width: 100%;
  text-align: center;
  text-shadow: 2px 2px 4px dimgray;
}

.headerIdent-title {
  font-size: 32px;
  font-weight: 500;
  color: #474747;
}

.headerIndent-headline {
  margin: 10px 0 0 0%;
  position: relative;
  text-align: left;
  color: black;
}

.colab-join-community {
  display: inline-flex;
  text-align: center;

  justify-content: center;
  align-items: center;
  border-radius: 16px;
  border: 1.5px solid #ffc719;
  padding: 5px 20px;

  box-shadow: 0px 2px 4px;
  background: #FFFFFF7F;

  text-decoration: none;

  strong {
    font-size: 40px;
    letter-spacing: 2px;
    text-shadow: 0px 2px 4px dimgrey;
  }
  sup {
    font-size: 7px;
    line-height: 7px;
    text-shadow: 0px 2px 4px dimgrey;
    top: -2.5em;
  }
}

.profileTitle {
  width: 100%;
  text-align: center;
  text-shadow: 2px 2px 4px dimgray;
}

.check-kindcolab-link {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  text-decoration: none;

  font-size: 17px;
  img {
    height: 15px;
  }
  // flex-direction: column;

  // align-items: flex-end;
}

.yourkindprofile {
  font-size: 36px;
  width: 100%;
  text-align: center;
  text-shadow: 2px 2px 4px dimgray;
}

@keyframes borderColor {
  0% {
    border-color: #ffc71a;
  }

}


@media (min-width:320px) {
  /* smartphones, iPhone, portrait 480x320 phones */
  .headerIndent {
    padding-left: 10%;
    padding-right: 10%;
  }

  .profileTitle {
    font-size: 35px;
    width: 100%;
    text-align: center;
    text-shadow: 2px 2px 4px dimgray;
  }
  .profileTitle.colab {
    font-size: 25px;
  }

  .secondaryImageType {
    font-size: 40px;
    text-shadow: 2px 2px 4px dimgray;
  }

  .profileImageSecondary {
    width: 96%;
    border-radius: 16px;
  }

}

/* normal smartphones of 2020 */
@media (min-width:374px) {
  .profileTitle {
    font-size: 40px;
  }
  .profileTitle.colab {
    font-size: 35px;
  }

  .secondaryImageType {
    font-size: 45px;
    text-shadow: 2px 2px 4px dimgray;
  }

  .check-kindcolab-link {
    flex-direction: row;
    align-items: center;


    font-size: 20px;
    img {
      height: 20px;
    }
  }
}

@media (min-width:641px) {
  /* portrait tablets, portrait iPad, landscape e-readers, landscape 800x480 or 854x480 phones */
  .profileTitle {
    font-size: 96px;
    width: 100%;
    text-align: center;
    text-shadow: 2px 2px 4px dimgray;
  }
  .profileTitle.colab {
    font-size: 50px;
  }

  .secondaryImageType {
    font-size: 40px;
    text-shadow: 2px 2px 4px dimgray;
  }

  .profileImageSecondary {
    width: 46%;
    border-radius: 16px;
  }

  .headerIndent {
    padding-left: 10%;
    padding-right: 10%;
  }

  .check-kindcolab-link {
    flex-direction: row;
    align-items: center;


    font-size: 24px;
    img {
      height: 22px;
    }
  }


  .yourkindprofile {
    font-size: 80px;
  }
}

@media (min-width:961px) {
  /* tablet, landscape iPad, lo-res laptops ands desktops */
}

@media (min-width:1025px) {
  /* big landscape tablets, laptops, and desktops */
}

@media (min-width:1281px) {
  /* hi-res laptops and desktops */
}


.mainContainer {
  z-index: 200;
  height: auto;
  width: 100vw;
  margin-top: 13vh;
  color: black;
  background-color: white;

}

.kindQuizWhite {
  height: 30px;
}

.kindQuizYellow {
  height: 5vh;
}

/* .revealImage {
    position: sticky; bottom: 0%; top: 0px; width: 106vw; height: 100vh; object-fit: cover; z-index: 50;
  } */
.revealContainer {
  position: fixed;
  top: 0px;
  bottom: 0px;
  left: 0px;
  right: 0px;
  overflow-x: hidden;
  overflow-y: scroll;
  color: white;
  height: 100vh;
  z-index: 9000;
  background-repeat: no-repeat;
  background-attachment: fixed;
  background-position: center;
  background-size: cover;

}

.fade2-enter-active,
.fade2-leave-active {
  transition: opacity 2.2s ease-in;
}

.fade2-enter,
.fade2-leave-to

/* .fade-leave-active below version 2.1.8 */
  {
  opacity: 0;
}
</style>